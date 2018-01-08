/*
  Critical CSS
  Twig Rendering
*/

module.exports = function(grunt) {

    // Change _base to your url
    var _base = 'http://base.url/';

    // Update with selectors of element you need to force into criticalCSS
    var globals = ['.site-header--sticky', '.site-header-sticky:after'];

    // Path to Critical output
    var output = 'templates/critical/';

    var _criticalcss = {
        home: {
            options: {
                url: _base,
                width: 1600,
                height: 1200,
                outputfile: output + 'home.css',
                filename: 'style.css',
                forceInclude: globals,
                buffer: 1800 * 1024
            }
        },
        template2: {
            options: {
                // base url plus path
                url: _base + 'template2.html',
                width: 1600,
                height: 1200,
                //output filename
                outputfile: output + '/template2.css',
                //input filename
                filename: "style.css",
                forceInclude: globals,
                buffer: 1800 * 1024
            }
        }
    };

    grunt.initConfig({
        criticalcss: {
            home: _criticalcss.home
        },
        /*
            Minifies all css files not .min.css
            keeps non-minified for debugging
            adds .min to filename
        */
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: output,
                    src: ["*.css", "!*.min.css"],
                    dest: output,
                    ext: ".min.css"
                }]
            }
        },

        /*
          https://www.npmjs.com/package/grunt-twig-render
        */
        twigRender: {
            your_target: {
                files: [{
                    data: [
                        "build/_json/section2.json",
                        "build/_json/section4.json"
                    ],
                    expand: true,
                    cwd: "build/_twig/",
                    src: ["**/*.twig", "!**/_*.twig"],
                    dest: "build/_dirty/",
                    ext: ".html"
                }]
            }
        }
    });


    grunt.loadNpmTasks("grunt-twig-render");
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['criticalcss', 'cssmin']);

};