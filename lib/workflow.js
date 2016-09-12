'use strict';

/**
 * run regression test
 */

var async = require('async');
var q = require('q');

function wrappedWorkflow(pagename, args) {
    var that = this;

    var cb = arguments[arguments.length - 1];

    var flow = this.instance.controlFlow().execute(function() {
        return workflow.call(that, pagename, args, cb);
    });

    return flow;
}

function workflow(pagename, args) {
    /*!
     * make sure that callback contains chainit callback
     */

    var cb = arguments[arguments.length - 1];

    this.needToSync = true;

    /*istanbul ignore next*/
    if (typeof args === 'function') {
        args = {};
    }

    if (!(args instanceof Array)) {
        args = [args];
    }

    /**
     * parameter type check
     */
    if (typeof pagename === 'function') {
        throw new Error('A pagename is required');
    }

    if (typeof args[0].name !== 'string') {
        throw new Error('You need to specify a name for your visual regression component');
    }

    var queuedShots = JSON.parse(JSON.stringify(args)),
        currentArgs = args[0];

    var context = {
        self: this,

        /**
         * default attributes
         */
        misMatchTolerance:      this.misMatchTolerance,
        screenshotRoot:         this.screenshotRoot,
        failedComparisonsRoot:  this.failedComparisonsRoot,

        instance:       this.instance,
        pagename:       pagename,
        currentArgs:    currentArgs,
        queuedShots:    queuedShots,
        baselinePath:   this.screenshotRoot + '/' + pagename + '.' + currentArgs.name + '.baseline.png',
        regressionPath: this.screenshotRoot + '/' + pagename + '.' + currentArgs.name + '.regression.png',
        diffPath:       this.failedComparisonsRoot + '/' + pagename + '.' + currentArgs.name + '.diff.png',
        screenshot:     this.screenshotRoot + '/' + pagename + '.png',
        isComparable:   false,
        warnings:       [],
        newScreenSize:  0,
        pageInfo:       null,
        updateBaseline: (typeof currentArgs.updateBaseline === 'boolean') ? currentArgs.updateBaseline : this.updateBaseline,
        screenWidth:    currentArgs.screenWidth || [].concat(this.screenWidth), // create a copy of the origin default screenWidth
        cb:             cb
    };

    /**
     * initiate result object
     */
    if(!this.resultObject[currentArgs.name]) {
        this.resultObject[currentArgs.name] = [];
    }

    async.waterfall([
        /**
         * make screenshot
         */
        require('./makeScreenshot.js').bind(context),

        /**
         * check if files with id already exists
         */
        require('./renameFiles.js').bind(context),

        /**
         * compare images
         */
        require('./compareImages.js').bind(context),

        /**
         * save image diff
         */
        require('./saveImageDiff.js').bind(context)
    ],
        /**
         * run workflow again or execute callback function
         */
        require('./asyncCallback.js').bind(context)
    );
}

module.exports = {
    workflow: workflow,
    promise: wrappedWorkflow
};