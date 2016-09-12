# selenecss

__CSS regression testing in SeleniumWebdriver__. This plugin is an automatic visual regression-testing
tool for [Selenium Webdriver](http://www.seleniumhq.org/projects/webdriver/) and [Selene](https://github.com/LiquidLabsGmbH/selene).
It was inspired by [Christian Bromann's](https://github.com/christian-bromann)
awesome project called [WebdriverCSS](https://github.com/webdriverio/webdrivercss). After
initialization it enhances a Webdriver instance with an additional command called
`selenecss` and enables the possibility to save screenshots of your application.

## How does it work?

1. Define areas within your application that should always look the same
2. Use a Selenium Webdriver instance and SeleneCSS to write some E2E tests and take screenshots of these areas
3. Continue working on your application or website
4. After a while rerun the tests
5. If desired areas differ from previous taken screenshots an image diff gets generated and you get notified in your tests

## Setup

To use this plugin just call the `init` function and pass the desired Webdriver instance
as parameter. Additionally you can define some options to configure the plugin. After that
the `selenecss` command will be available only for this instance.

* **screenshotRoot** `String` ( default: *./selenecss* )<br>
  path where all screenshots get saved.

* **failedComparisonsRoot** `String` ( default: *./selenecss/diff* )<br>
  path where all screenshot diffs get saved.

* **misMatchTolerance** `Number` ( default: *0.05* )<br>
  number between 0 and 100 that defines the degree of mismatch to consider two images as
  identical, increasing this value will decrease test coverage.

* **screenWidth** `Numbers[]` ( default: *[]* )<br>
  if set, all screenshots will be taken in different screen widths (e.g. for responsive design tests)

* **updateBaseline** `Boolean` ( default: *false* )<br>
  updates baseline images if comparison keeps failing.

