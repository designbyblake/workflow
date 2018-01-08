/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require('fs');
var spooky = require('./spooky');
var path = fs.absolute(fs.workingDirectory + '/build/tests/phantomcss.js');
var phantomcss = require(path);
var compareIt = casper.cli.get('compare');

casper.test.begin('Fishbowl Contact', function(test) {
    phantomcss.init({
        rebase: casper.cli.get("rebase"),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: spooky.libraryRoot,
        screenshotRoot: spooky.screenshotRoot,
        comparisonResultRoot: spooky.comparisonResultRoot,
        failedComparisonsRoot: spooky.failedComparisonsRoot,
        addLabelToFailedImage: spooky.addLabelToFailedImage,
        cleanupComparisonImages: spooky.cleanupComparisonImages,
        //Example of ignoring template specific and globabl specific items.
        //hideElements: '.brand-list__item:first-child, ' + spooky.hideElements,
        hideElements: spooky.hideElements,

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


    casper.start(spooky.root + 'contact/')
        .viewport(spooky.extraLargeW, spooky.extraLargeH)
        // If LazyLoaded images uncomment
        .scrollToBottom()
        .then(function() {
            this.wait(5000, function() {
                phantomcss.screenshot('.flex-list__fluid:first-child', 'Contact Form Desktop');
                phantomcss.screenshot('.flex-list__fluid:last-child', 'Contact Address  Desktop');
            });
        })
        .then(function() {
            casper.viewport(spooky.mediumW, spooky.mediumH);
            phantomcss.screenshot('.flex-list__fluid:first-child', 'Contact Form Tablet');
            phantomcss.screenshot('.flex-list__fluid:last-child', 'Contact Address  Tablet');

        })
        .then(function() {
            casper.viewport(spooky.smallW, spooky.smallH);
            phantomcss.screenshot('.flex-list__fluid:first-child', 'Contact Form Mobile');
            phantomcss.screenshot('.flex-list__fluid:last-child', 'Contact Address  Mobile');
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