/*jslint node: true, this: true */
"use strict";
const child_process = require("child_process");

module.exports = function (grunt) {
    grunt.registerMultiTask(
        "phpstan",
        "Check your PHP files with phpstan",
        function () {
            const done = this.async();
            const options = this.options(
                {
                    level: null,
                    bin: "phpstan",
                    config: null
                }
            );
            let args = ["analyze"];

            // if no level has been specified and no config file has been specified, default the level to 1
            if(options.level === null && options.config === null) {
                options.level = 1;
            }

            if (options.level) {
                args.push("-l", options.level);
            }
            if (options.config) {
                args.push("-c", options.config);
            }
            args = args.concat(this.filesSrc);
            child_process.execFile(
                options.bin,
                args,
                null,
                function (error, stdout) {
                    let result = false;

                    if (error) {
                        if (error.code === 1) {
                            // This is a phpstan error, only display stdout.
                            grunt.log.error(stdout);
                        } else {
                            // Not a phpstan error, display the full error.
                            result = error;
                        }
                    } else {
                        grunt.log.ok();
                        result = true;
                    }
                    done(result);
                }
            );
        }
    );
};
