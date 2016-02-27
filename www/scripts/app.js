define('app', [
    'jquery',
    'fastclick'
], function(
    $,
    FastClick
) {
    'use strict';

    FastClick.attach(document.body);

    // Подключение галерей
    (function($gallerys) {
        if (!$gallerys.length) {
            return;
        }

        require(['app/gallery'], function onFotoramaLoaded(gallery) {
            $gallerys.each(function() {
                gallery($(this));
            });


        });
    })($('.j-gallery'));

    return {};
});
