'use strict';

var glob = require('glob'),
    fs   = require('fs');

module.exports = function() {
    var done = arguments[arguments.length - 1];

    glob('{' + this.regressionPath + ',' + this.baselinePath + '}', {}, function(err,files) {
        /**
         * if no files were found continue
         */
        if(files.length === 0) {
            return fs.rename(this.screenshot, this.baselinePath, done);
        }

        this.isComparable = true;
        this.filename = this.regressionPath;

        /**
         * rename existing files
         */
        if(files.length === 2 && this.updateBaseline) {
            return fs.rename(this.regressionPath, this.baselinePath, done);
        } else {
            return fs.rename(this.screenshot, this.regressionPath, done);
        }

    }.bind(this));
};
