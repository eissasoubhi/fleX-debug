# fleX-debug
An extension for Xdebug php extension inspired by https://github.com/callumlocke/json-formatter allowing navigation in printed data like tree nodes instead of scrolling up-down, up-down, up-down, up-down... >:( 

see [demo](https://netfox01.github.io/fleX-debug/)

#Table of contents

- [Installation](#how-to-use)
- [URL to try it on](#demo)
- [Screenshot ](#screenshot)
- [To do list](#to-do-list)
- [License](#license)

#<a name="how-to-use"></a>Installation
**install it from source**:

- clone/download this repo,
- open Chrome and go to `chrome://chrome/extensions/`,
- enable "Developer mode",
- click "Load unpacked extension",
- select the `extension` folder in this repo.

**you can get this extension as a JQuery plugin in `flex-debug-plugin.js` branch**:

To show full object/array values, you may have to change the xdebug var_display_max_depth variable to a greater value in php.ini or at runtime via ini_set("xdebug.var_display_max_depth",10);
see http://stackoverflow.com/questions/9998490/how-to-get-xdebug-var-dump-to-show-full-object-array

#<a name="demo"></a>URL to try it on

https://netfox01.github.io/fleX-debug/test-it.html

#<a name="screenshot"></a>Screenshot
![img][screenshot]
[screenshot]: /screenshot.png

#<a name="to-do-list"></a>To do list

- Publish this extension on chrome web store

#<a name="license"></a>License
The contents of this repository is licensed under [The MIT License.](https://opensource.org/licenses/MIT)
