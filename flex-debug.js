jQuery(document).ready(function($)
{
    // ******************************* FleXDebugFormatter class *****************************

    function FleXDebugFormatter (xdebug_html)
    {
        this.array_html_lines = [];

        this.lines = []; // lines objects

        this.formatted_html = false; // resulted html
        // constructor
        this.__proto__.init  =  function ()
        {
            this.xdebug_html_to_array_html_lines(xdebug_html);

            this.createLinesObjects(this.array_html_lines);

            this.line_navigation_icon_data = this.line_navigation_icon_data(); // image base64 data

            this.setLineNavigationIconStyle(); // set image to line backgound image style

            this.line_navigation_icon = this.line_navigation_icon(); // set style to navigation icon span

            this.format();
        }

        this.__proto__.xdebug_html_to_array_html_lines = function (xdebug_html)
        {
            this.array_html_lines =  xdebug_html.split('\n');
        }

        this.__proto__.createLinesObjects =  function  (array_html_lines)
        {
            this_flexdebug_obj = this;

            $(array_html_lines).each(function(index, line_html)
            {
                line_object = new Line(index, line_html);

                this_flexdebug_obj.lines.push(line_object);
            });
        }

        this.__proto__.format  =  function ()
        {
            this.setChildrenLinesToParents();

            this.wrapLinesHtml();
        }

        this.__proto__.setChildrenLinesToParents  =  function  ()
        {   // set children lines to eatch line object
            var this_flexdebug_obj = this;

            $(this_flexdebug_obj.lines).each(function(index, line)
            {
                line.retrieveChildrenLinesFrom(this_flexdebug_obj.lines);

                line.removeEmptyChildrenLines();
            });
        }

        this.__proto__.wrapLinesHtml  =  function ()
        {   // insert every line html content into its suitable html div
            var wrapped_lines_html = "";

            var this_flexdebug_obj = this;

            $(this_flexdebug_obj.lines).each(function(index, line)
            {
                if (!line.is_wrapped) // if isnt already wrapped with html
                {
                    wrapped_lines_html += this_flexdebug_obj.wrapLineChildrenHtml(line)
                };
            });

            this.formatted_html = wrapped_lines_html;
        }

        this.__proto__.wrapLineChildrenHtml  =  function (line)
        {   // insert a line html content into its suitable html div.
            // it does the same thing recursively for each of its children lines if any.
            var wrapped_line_html;

            var this_flexdebug_obj = this;

            var result;

            if (line.isParent())
            {
                wrapped_line_html = '<div class="parent expended" '+

                                    ' data-line="' + ( line.line_number + 1 ) + '" >' +

                                    this.line_navigation_icon + // tree navigator triangle

                                    this.dots( line.level ) +  // navigator triangle corresponding line indicator

                                    line.html;

                if (line.hasChildenLines())
                {
                    wrapped_line_html +='<div class="children" '+

                                        'data-children-length="' + line.children_lines.length + '">'; // children count

                    $(line.children_lines).each(function (index, child_line)
                    {
                        if (!child_line.is_wrapped) // is not already wrapped
                        {
                           wrapped_line_html += this_flexdebug_obj.wrapLineChildrenHtml(child_line)
                        }
                    })

                    wrapped_line_html +='</div>';
                };

                result = wrapped_line_html +='</div>';
            }
            else
            {
                result = line.html + '\n';
            }

            line.is_wrapped = true;

            return result;
        }
        this.__proto__.getFormattedHtml = function ()
        {
            if (!this.formatted_html)
            {
                this.format();
            };

            this.showLineNumbers(); // show left line nimbers bar

            return '<pre class="flex-debug-formatted" dir="ltr">' + this.formatted_html + '</pre>';
        }
        this.__proto__.line_navigation_icon_data = function ()
        {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYGBgOADE%2F3Hgw0DM4IRHgSsDFOzFInmMAQnY49ONzZRjDFiADT7dMLALiE8y4AGW6LoBAgwAuIkf%2F%2FB7O9sAAAAASUVORK5CYII%3D';
        }
        this.__proto__.line_navigation_icon = function ()
        {
            var style = this.line_navigation_icon_style;

            return '<span class="navigation_icon" style="'+style+'"></span>';
        }
        this.__proto__.setLineNavigationIconStyle = function ()
        {
            this.line_navigation_icon_style = 'background-image: url('+ this.line_navigation_icon_data +');';
        }
        this.__proto__.showLineNumbers = function ()
        {   // generates left line numbers bar
            var formatted_html_lines_count = this.lines.length;

            var lef_lines_numbers = '<div class="lef_lines_numbers">'

            for (var i = 1; i <= formatted_html_lines_count; i++)
            {
                lef_lines_numbers += '<div class="line_number">' + i + '</div>';
            };

            lef_lines_numbers += '</div>';

            this.formatted_html = lef_lines_numbers + this.formatted_html;
        }
        this.__proto__.dots = function (line_white_space_length)
        {   // return a border dotted span with a width generated from a given whitespace number (line level)
            var dots_left_right_margin = 2; // span left and right margin in whitespace unit

            if(line_white_space_length >= dots_left_right_margin)
            {
                line_white_space_length = line_white_space_length - dots_left_right_margin;
            }

            var white_space_px_with = 7; // whitespace width in px

            var white_space_length_in_px = line_white_space_length * white_space_px_with;

            return '<span class="dots" style="width: ' + white_space_length_in_px + 'px;"></span>';
        }

        this.init();
    }

    // ******************************* Line class ******************************************

    function Line (line_number, line_html)
    {
        this.html = line_html;

        this.line_number = line_number;

        this.children_lines = [];

        this.is_wrapped = false;

        this.level = false; // equals this line whitespace character number
        // constructor
        this.__proto__.init  =  function ()
        {
            this.setLevel();
        }

        this.__proto__.retrieveChildrenLinesFrom  =   function(lines_list)
        {
            var children_lines = this.findChildrenLinesIn(lines_list);

            if (children_lines.length) // if any children found
            {
                this.appendToChildrenLines(children_lines);
            };
        }
        this.__proto__.findChildrenLinesIn  =  function (lines_list)
        {
            var children_lines = [];

            if (this.isParent())
            {
                var current_line = this;

                while(next_line = current_line.nextLineIn(lines_list))
                {
                    if (next_line.level > this.level)
                    {   // next_line is a child of this line
                         children_lines.push(next_line);

                         current_line = next_line;
                    }
                    else
                    {   // next_line is a sibling or a parent of this line
                        break;
                    }
                }
            };

            return children_lines;
        }

        this.__proto__.appendToChildrenLines  =  function (children_lines)
        {
            var this_line_obj = this;

            $(children_lines).each(function(index, line)
            {
                this_line_obj.children_lines[line.line_number] = line;
            });
        }
        this.__proto__.isParent = function ()
        {
            return this.html.match(/<b>.*<\/b>/gi); // true if has <b> tag
        }
        this.__proto__.removeEmptyChildrenLines = function ()
        {   // remove empty or undefined values in children_lines array
            var this_line_obj = this;

            this_line_obj.children_lines = $.grep(this_line_obj.children_lines, function(line){ return line });
        }
        this.__proto__.hasNextLineIn  =  function (lines_list)
        {
            line_number = this.line_number;

            return typeof lines_list[line_number + 1] !== "undefined";
        }
        this.__proto__.nextLineIn  =  function (lines_list)
        {
            if(!this.hasNextLineIn(lines_list))
            {
                return false;
            }

            line_number = this.line_number;

            return lines_list[line_number + 1];
        }
        this.__proto__.setLevel  =  function ()
        {
            this.level = this.html.match(/^([ ]*)/)[0].length; // number of whitespace charachters
        }
        this.__proto__.hasChildenLines  =  function ()
        {
            return this.children_lines.length > 0;
        }

        this.init();
    }

    // ******************************* fleXDebugDomManager class ******************************

    function fleXDebugDomManager ()
    {
        this.animation_speed = 500;

        this.collapsed_class = 'collapsed';

        this.expended_class = 'expended';

        this.data_height_attr = 'data-height';

        this.data_closed_by_attr = 'data-closed-by';

        this.data_line_attr = 'data-line';

        this.data_children_length_attr = 'data-children-length';

        // constructor
        this.__proto__.init  =  function ()
        {
            this.triggerEvents();

            this.loadCssToPage();
        }

        this.__proto__.getLinesNumbers = function ($lef_lines_numbers, from, length)
        {   // returns an array of matched jquery objects of .line_number elements having a number between (from) and (from + length)
            var lines_numbers = [];

            var max_line_number = (parseInt(from) + parseInt(length));

            $lef_lines_numbers.each(function(index, line_number)
            {
                if(parseInt($(line_number).text()) > from && parseInt($(line_number).text()) <= max_line_number )
                {
                    lines_numbers.push($(line_number))
                }
            });

            return lines_numbers;
        }

        this.__proto__.collapseChildren = function ($parent)
        {
                $parent.addClass(this.collapsed_class).removeClass(this.expended_class);

                var parent_height = $parent.children(".children").height();

                $parent.attr(this.data_height_attr, parent_height);

                $parent.children(".children").animate({height: '0'},this.animation_speed)
        }
        this.__proto__.expendChildren = function ($parent)
        {
            $parent.addClass(this.expended_class).removeClass(this.collapsed_class);

            var auto_height = $parent.attr(this.data_height_attr);

            $parent.children(".children").animate({height: auto_height}, this.animation_speed, function ()
            {
                $(this).height('auto');
            })
        }

        this.__proto__.closeLinesNumbers = function (matched_lines_numbers, clicked_line_number)
        {
            var this_flexdebugmanager_obj = this;

            $(matched_lines_numbers).each(function()
            {
                if (!$(this).attr(this_flexdebugmanager_obj.data_closed_by_attr) )
                {
                    $(this).attr(this_flexdebugmanager_obj.data_closed_by_attr, clicked_line_number)
                };

                $(this).animate({height: '0'}, this_flexdebugmanager_obj.animation_speed);
            });
        }

        this.__proto__.openLinesNumbers = function (matched_lines_numbers, clicked_line_number, line_number_height)
        {
            var this_flexdebugmanager_obj = this;

            $(matched_lines_numbers).each(function()
            {
                if (parseInt($(this).attr(this_flexdebugmanager_obj.data_closed_by_attr)) == clicked_line_number)
                {
                    $(this).removeAttr(this_flexdebugmanager_obj.data_closed_by_attr).animate({height: line_number_height}, this_flexdebugmanager_obj.animation_speed);
                };
            });
        }

        this.__proto__.triggerEvents = function ()
        {
            this_flexdebugmanager_obj = this;

            $('.navigation_icon').click(function(event)
            {
                $parent = $(this).parent('.parent');

                var clicked_line_number = $parent.attr(this_flexdebugmanager_obj.data_line_attr);

                var length = $parent.children('.children').attr(this_flexdebugmanager_obj.data_children_length_attr);

                var from = clicked_line_number;

                var $lef_lines_numbers = $parent.parents('pre.xdebug-var-dump').find('.lef_lines_numbers .line_number');

                var matched_lines_numbers = this_flexdebugmanager_obj.getLinesNumbers($lef_lines_numbers, from, length);

                var line_number_height = $(".lef_lines_numbers .line_number").first().height();

                if($parent.hasClass(this_flexdebugmanager_obj.expended_class))
                {
                    this_flexdebugmanager_obj.collapseChildren($parent);

                    this_flexdebugmanager_obj.closeLinesNumbers(matched_lines_numbers, clicked_line_number);
                }
                else
                {
                    this_flexdebugmanager_obj.expendChildren($parent);

                    this_flexdebugmanager_obj.openLinesNumbers(matched_lines_numbers, clicked_line_number, line_number_height)

                }
                return false;
            });
        }

        this.__proto__.loadCssToPage = function ()
        {
            var style_tag = '<style type="text/css" media="screen"> .xdebug-var-dump .parent{padding-left: 8px; position: relative; } .xdebug-var-dump .parent > b, .xdebug-var-dump .parent > i{background-color: #FFF; } .xdebug-var-dump .children{padding-left: 10px; border-left: 1px dotted rgba(0, 0, 0, 0.38); overflow: hidden; } .xdebug-var-dump .navigation_icon{display: inline-block; opacity: 0.35; background-repeat: no-repeat; background-position: center; position: relative; top: 4px; width: 12px; height: 12px; cursor: pointer; } .xdebug-var-dump .dots{border-top: 1px dotted rgb(180, 162, 162);; position: absolute; top: 8px; height: 1px; display: inline-block; left: 27px; } .xdebug-var-dump .parent.collapsed > .navigation_icon{transform: rotate(-90deg); -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); } .xdebug-var-dump .line_number{opacity: 0.4; overflow: hidden; } .xdebug-var-dump .lef_lines_numbers{float: left; margin-right: 5px; margin-left: 5px; } .hide{display: none; } </style>';

            $('head').append(style_tag);
        }

    }

    // ******************************* regestering flexdebug method ******************************************

    $.fn.flexDebug = function ()
    {
        $(this).each(function(index, el)
        {
            fleXDebugFormatter = new FleXDebugFormatter($(this).html());

            formattedHtml = fleXDebugFormatter.getFormattedHtml();

            $(this).html(formattedHtml);
        });

        var fleX_debug_dom_manager = new fleXDebugDomManager();

        fleX_debug_dom_manager.init();
    };

    // ******************************* initialize  ******************************************

    $('pre.xdebug-var-dump').flexDebug();

});