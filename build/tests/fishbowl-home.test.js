/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require('fs');
var spooky = require('./spooky');
var path = fs.absolute(fs.workingDirectory + '/build/tests/phantomcss.js');
var phantomcss = require(path);
var compareIt = casper.cli.get('compare');

casper.test.begin('Fishbowl Homepage', function(test) {
    phantomcss.init({
        rebase: casper.cli.get("rebase"),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute(fs.workingDirectory + ''),
        screenshotRoot: spooky.screenshotRoot,
        comparisonResultRoot: spooky.comparisonResultRoot,
        failedComparisonsRoot: spooky.failedComparisonsRoot,
        addLabelToFailedImage: spooky.addLabelToFailedImage,
        cleanupComparisonImages: spooky.cleanupComparisonImages,
        //Example of ignoring template specific and globabl specific items.
        //hideElements: '.brand-list__item:first-child, ' + spooky.hideElements,
        hideElements: '.brand-list__item:first-child, ' + spooky.hideElements,
    });

    casper.on('remote.message', function(msg) {
        this.echo(msg);
    });

    casper.on('error', function(err) {
        this.die("PhantomJS has errored: " + err);
    });

    casper.on('resource.error', function(err) {
        casper.log('Resource load error: ' + err, 'warning');
    });


    casper.start(spooky.root)

    .viewport(1400, 768)
        // If LazyLoaded images uncomment
        .scrollToBottom()
        .then(function() {
            phantomcss.screenshot('#hp-btns', 'Homepage Buttons');
            phantomcss.screenshot('.cta', 'CTA Desktop');
            phantomcss.screenshot('.section--alt', 'Brands Desktop');
        })
        .then(function() {
            casper.click('.site-header__menu');
            this.wait(2000, function() {
                phantomcss.screenshot('.menu__container', 'Menu Desktop');
            });
        })
        .then(function() {
            casper.click('.site-header__menu');
            this.wait(2000, function() {
                casper.viewport(768, 1024);
                phantomcss.screenshot('.cta', 'CTA Tablet');
                phantomcss.screenshot('.section--alt', 'Brands Tablet');
            });
        })
        .then(function() {
            casper.viewport(375, 667);
            phantomcss.screenshot('.cta', 'CTA Mobile');
            phantomcss.screenshot('.section--alt', 'Brands Mobile');
        })
        .then(function now_check_the_screenshots() {
            // compare screenshots
            if (compareIt !== false) {
                phantomcss.compareAll();
                phantomcss.getCreatedDiffFiles();
            }
        })
        .run(function() {
            console.log('\nTHE END.');
            // phantomcss.getExitStatus() // pass or fail?
            casper.test.done();

        });
});