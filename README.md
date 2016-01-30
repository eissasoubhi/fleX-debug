# fleX-debug
A plugin for Xdebug php extension inspired by https://github.com/callumlocke/json-formatter allowing navigation in printed data like tree nodes instead of scrolling up-down, up-down, up-down, up-down... >:( 

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

To show full object/array values, you may have to change the xdebug var_display_max_depth variable to a greater value in php.ini or at runtime via ini_set("xdebug.var_display_max_depth",10);
see http://stackoverflow.com/questions/9998490/how-to-get-xdebug-var-dump-to-show-full-object-array

#<a name="demo"></a>Live demo
http://netfox01.github.io/flex-debug.html 

#<a name="screenshot"></a>Screenshot
![img][screenshot]
[screenshot]: /screenshot.png

#<a name="to-do-list"></a>To do list
- Make a google chrome and firefox extensions not to forget IE .. just kidding 

#<a name="license"></a>License
The contents of this repository is licensed under [The MIT License.](https://opensource.org/licenses/MIT)
