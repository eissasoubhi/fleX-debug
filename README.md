# fleX-debug
An extension for Xdebug php extension inspired from https://github.com/callumlocke/json-formatter allowing navigation in printed data like tree nodes instead of scrolling up-down, up-down, up-down, up-down... >:( 

#Table of contents

- [Requirements](#requirements)
- [How to use](#how-to-use)
- [Live demo](#demo)
- [Screenshot ](#screenshot)
- [To do list](#to-do-list)
- [License](#license)


#<a name="requirements"></a>Requirements
- jQuery
- Xdebug

#<a name="how-to-use"></a>How to use
- Include flex-debug.js in your page 
- Enjoy

To show full object/array values, you may have to change the xdebug var_display_max_depth variable to a greater value ini php.ini or at runtime via ini_set("xdebug.var_display_max_depth",10);
see http://stackoverflow.com/questions/9998490/how-to-get-xdebug-var-dump-to-show-full-object-array

#<a name="demo"></a>Live demo
Working on it :)

#<a name="screenshot"></a>Screenshot
![img][screenshot]
[screenshot]: /screenshot.png

#<a name="to-do-list"></a>Live To do list
- Make a google chrome and firefox extensions not to forget IE .. just kedding 

#<a name="license"></a>License
Don't give a sh*t just use it 