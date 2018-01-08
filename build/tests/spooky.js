// New touch detection since Modernizr was removed
var fs = require('fs');
var spooky = {
    root: 'http://fishbowl.app/',
    libraryRoot: fs.absolute(fs.workingDirectory + ''),
    screenshotRoot: fs.absolute(fs.workingDirectory + '/build/tests/screenshots/shots'),
    comparisonResultRoot: fs.absolute(fs.workingDirectory + '/build/tests/screenshots/compare'),
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/build/tests/screenshots/failures'),
    addLabelToFailedImage: true,
    cleanupComparisonImages: false,
    hideElements: '.smonitor--left, .smonitor--right',
    extraLargeW: 1400,
    extraLargeH: 768,
    largeW: 960,
    largeH: 768,
    mediumW: 768,
    mediumH: 1024,
    smallW: 375,
    smallH: 667
        /*
            fileNameGetter: function overide_file_naming(){},
            onPass: function passCallback(){},
            onFail: function failCallback(){},
            onTimeout: function timeoutCallback(){},
            onComplete: function completeCallback(){},
            hideElements: '#thing.selector',
            addLabelToFailedImage: true,
            outputSettings: {
            	errorColor: {
            		red: 255,
            		green: 255,
            		blue: 0
            	},
            	errorType: 'movement',
            	transparency: 0.3
            }*/
};
module.exports = spooky;