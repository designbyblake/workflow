/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require('fs');
var spooky = require('./spooky');
var path = fs.absolute(fs.workingDirectory + '/build/tests/phantomcss.js');
var phantomcss = require(path);

casper.test.begin('...human sacrifice, dogs and cats living together... MASS HYSTERIA!', function(test) {
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


    casper.start(spooky.root + 'our-technology/')
        .then(function now_check_the_screenshots() {
            // compare screenshots
            phantomcss.compareAll();
            phantomcss.getCreatedDiffFiles();

        })
        .run(function() {
            console.log('\n');
            console.log('\nWe came, we saw, we kicked its ass!');
            console.log('\n');
            // phantomcss.getExitStatus() // pass or fail?
            casper.test.done();
        });
});