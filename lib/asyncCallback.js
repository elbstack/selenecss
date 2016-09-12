'use strict';

/**
 * run workflow again or execute callback function
 */

var workflow = require('./workflow.js').workflow,
    endSession = require('./endSession.js');

module.exports = function(err) {
    var that = this;

    /**
     * finish command
     */
    return endSession.call(this, function(err) {
        that.self.takeScreenshot = undefined;
        that.cb && that.cb(err, that.self.resultObject);
        that.self.resultObject = {};
    });

};
