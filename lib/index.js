'use strict';

/**
 * SeleneCSS
 */

var fs = require('fs-extra'),
    syncImages = require('./syncImages'),
    workflow = require('./workflow');

/**
 * initialise plugin
 */
var SeleneCSS = function(webdriverInstance, options) {
    options = options || {};

    if(!webdriverInstance) {
        throw new Error('A selenium-webdriver instance is needed to initialise SeleneCSS');
    }

    /**
     * general options
     */
    this.screenshotRoot = options.screenshotRoot || 'selenecss';
    this.failedComparisonsRoot = options.failedComparisonsRoot || (this.screenshotRoot + '/diff');
    this.misMatchTolerance = options.misMatchTolerance || 0.05;
    this.screenWidth = options.screenWidth || [];
    this.warning = [];
    this.resultObject = {};
    this.instance = webdriverInstance;
    this.updateBaseline = (typeof options.updateBaseline === 'boolean') ? options.updateBaseline : false;

    /**
     * sync options
     */
    this.key = options.key;
    this.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    this.reqTimeout = 5 * 60 * 1000;
    this.api  = options.api;
    this.saveImages = options.saveImages || true;

    /**
     * create directory if it doesn't already exist
     */
    var createDirectory = function(path) {
        if(!fs.existsSync(path)) {
            fs.mkdirsSync(path, '0755', true);
        }
    };

    createDirectory(this.screenshotRoot);
    createDirectory(this.failedComparisonsRoot);

    /**
     * add SeleneCSS command to Selene instance
     */

    this.instance.selenecss = workflow.promise.bind(this);
    this.instance.sync = syncImages.default.bind(this);
    this.instance.syncUp = syncImages.syncUp.bind(this);
    this.instance.syncDown = syncImages.syncDown.bind(this);

    return this;
};

/**
 * expose SeleneCSS
 */
module.exports.init = function(webdriverInstance, options) {
    return new SeleneCSS(webdriverInstance, options);
};
