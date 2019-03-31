/*jslint node: true, this: true */
"use strict";
var child_process = require("child_process");

module.exports = function (grunt) {
    grunt.registerMultiTask(
        "phpstan",
        "Check your PHP files with phpstan",
        function () {
            var done = this.async();
            var options = this.options(
                {
                    level: 1,
                    bin: "phpstan"
                }
            );
            child_process.exec(
                options.bin + " analyze -l " + options.level +
                " " + this.filesSrc.join(" "),
                null,
                function (error, stdout) {
                    var result = false;

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
