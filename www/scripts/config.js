require.config({
    baseUrl: '/scripts/lib',

    paths : {
        app             : '../app',
        tpl             : '../tpl',

        jquery          : 'jquery/dist/jquery.min',
        fastclick       : 'fastclick/lib/fastclick',
        modernizr       : 'modernizr/modernizr',
        polyfiller      : 'webshim/js-webshim/dev/polyfiller',
        fotorama        : 'fotorama/fotorama',
        'masked-inputs' : 'jquery.maskedinput/dist/jquery.maskedinput.min',
        handlebars      : 'handlebars/handlebars.runtime.min'
    },
    shim : {
        fastclick : {
            exports: 'FastClick'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    /* Launch app.js after config */
    deps: ['app']
});
