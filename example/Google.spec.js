var selene = require('selene');
var assert = require('assert');
var expect = require('unexpected');
var unexpectedWeb = require('unexpected-webdriver');
expect.use(unexpectedWeb());

var selenecss = require('../lib/index.js');

var se = selene({
  browser: 'chrome'
});

selenecss.init(se, {});

describe("Google", function() {
  this.timeout(60000);

  it("should find selene npm package", () => {
    se.goto('http://www.google.com');

    se.fill({ q: 'selene npm' });
    se.click({ name: 'btnG'});

    se.wait({ title: 'selene npm - Google-Suche' });
    se.click('a[href*="npmjs.com"]');

    se.wait({ url: 'https://www.npmjs.com/package/selene' });

    se.selenecss('NpmSelene', {
      name: 'body',
      elem: 'body'
    }, function (err, res) {
      if (err) {
        console.log('error', err);
        return expect(false, 'to be', true);
      }
      return expect(res['body'][0].isWithinMisMatchTolerance, 'to be', true);
    });

    se.sleep(2000);

    var name = se.find('.package-name');
    return expect(name, 'to contain text', 'selene');
  })
});
