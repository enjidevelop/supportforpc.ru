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

    //плавный скролл
    (function() {
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            var id  = $(this).attr('href');
            var top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1000);
        });
    })();

    return {};
});
