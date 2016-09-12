'use strict';

var async = require('async'),
    merge = require('deepmerge'),
    request = require('request');

module.exports = function(done) {
    var that = this;

    async.waterfall([
        /**
         * clear session, store result
         */
        function(res, body) {
            var cb = arguments[arguments.length - 1];

            if(body) {
                that.self.resultObject[that.currentArgs.name] = merge({
                    id: that.self.sessionId,
                    url: that.self.url
                }, JSON.parse(body));
                that.self.url = undefined;
                that.self.sessionId = undefined;
                that.self.isNew = undefined;
            }
            return cb();
        }
    ], function(err) {
        return done(err);
    });
};
