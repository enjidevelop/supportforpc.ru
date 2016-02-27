define(['jquery'], function() {
    'use strict';

    var script = function($wrap) {
        var $gallery = $wrap.find('.b-gallery__base');
        var $prev = $wrap.find('.j-gallery__prev');
        var $next = $wrap.find('.j-gallery__next');
        var isLoop = $gallery.data('loop');
        var disabled = 'is-disabled';
        var $labels    = $gallery.data('labels');

        var initGallery = function initGallery() {
            require(['fotorama'], function() {
                $gallery
                    .on('fotorama:show', function(e, fotorama) {
                        var prevMethod = fotorama.activeIndex === 0 ?
                            'addClass' :
                            'removeClass';

                        var nextMethod = fotorama.size -
                        fotorama.activeIndex === 1 ?
                            'addClass' :
                            'removeClass';

                        if (!isLoop) {
                            $prev[prevMethod](disabled);
                            $next[nextMethod](disabled);
                        }

                        if ($labels) {
                            var $container = $(this)
                                .find('.fotorama__nav__shaft');
                            var $thumbWidth = $(this).data('thumbwidth');

                            $.each($labels, function(item, text) {
                                var $element = $('<span class="fotorama-lbl">' +
                                    '</span>')
                                    .text(text)
                                    .css('left', ($thumbWidth + 2) * item);
                                $container.append($element);
                            });
                        }
                    })
                    .on('fotorama:ready', function(e, fotorama) {
                        $prev.click(function() {
                            fotorama.show('<');
                        });

                        $next.click(function() {
                            fotorama.show('>');
                        });

                    })
                    .fotorama();
            });
        };
        initGallery();
    };

    return script;
});
