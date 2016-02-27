require.config({
    baseUrl: '/scripts/lib',

    paths : {
        app             : '../app',

        jquery          : 'jquery/dist/jquery.min',
        fastclick       : 'fastclick/lib/fastclick',
        modernizr       : 'modernizr/modernizr',
        polyfiller       : 'webshim/js-webshim/dev/polyfiller',
        fotorama        : 'fotorama/fotorama',
    },
    shim : {
        fastclick : {
            exports: 'FastClick'
        },
        modernizr: {
            exports: 'Modernizr'
        }
    },
    /* Launch app.js after config */
    deps: ['app']
});
