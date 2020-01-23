var uncss = require('uncss');

var files = ['http://localhost:1313', 'http://localhost:1313/about', 'http://localhost:1313/contact'],
    options = {
        banner: false,
        csspath: '../public/css/',
        htmlroot: 'public',
        ignore: ['#added_at_runtime', /test\-[0-9]+/],
        ignoreSheets: [/fonts.googleapis/,/youtube.com/],
        inject: function (window) { window.document.querySelector('html').classList.add('no-csscalc', 'csscalc'); },
        jsdom: {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
        }
        media: ['(min-width: 700px) handheld and (orientation: landscape)'],
        raw: 'h1 { color: green }',
        report: false,
        strictSSL: true,
        stylesheets: [],
        timeout: 1000,
        uncssrc: '.uncssrc',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
    };

uncss(files, options, function (error, output) {
    console.log(output);
});

/* Look Ma, no options! */
uncss(files, function (error, output) {
    console.log(output);
});

/* Specifying raw HTML */
var rawHtml = '...';

uncss(rawHtml, options, function (error, output) {
    console.log(output);
});