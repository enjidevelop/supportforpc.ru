define('app', [
    'jquery',
    'fastclick'
], function(
    $,
    FastClick
) {
    'use strict';

    FastClick.attach(document.body);

    // Подключение формы
    (function($forms) {
        if (!$forms.length) {
            return;
        }

        var initForms = function initForms(Form) {
            $forms.each(function() {
                var form = new Form($(this));
                form.init();
            });
        };

        require(['app/form'], initForms);
    })($('form').filter(':not([data-noinit])'));

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
