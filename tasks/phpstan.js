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
                    level: 1,
                    bin: "phpstan",
                    config: null
                }
            );
            let args = ["analyze", "-l", options.level];
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
