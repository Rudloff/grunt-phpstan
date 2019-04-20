# grunt-phpstan

[Grunt](https://gruntjs.com/) task that runs [phpstan](https://github.com/phpstan/phpstan).

## Usage

```js
/*jslint node: true*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        phpstan: {
            options: {
                level: "max",
                bin: "vendor/bin/phpstan",
                config: "phpstan.neon"
            },
            php: {
                src: ["*.php"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-phpstan");
};
```

```bash
grunt phpstan
```
