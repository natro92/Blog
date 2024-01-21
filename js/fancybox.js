$(document).ready(function () {
    $('img').each(function () {
        if ($(this).parent().hasClass('fancybox')) return;
        if ($(this).hasClass('nofancybox')) return;
        // 只有父或者祖控件有是article才进行fancybox 否则会影响其他页面
        if ($(this).parents('article').length === 0) return;
        // if ($(this).parents('article').length === 0 && $(this).parents('.scrolling-marquee').length === 0) return;
        var alt = this.alt;
        if (alt) $(this).after('<span class="caption">' + alt + '</span>');
        $(this).wrap('<a href="' + ($(this).attr('data-src') == null ? this.src : $(this).attr('data-src')) + '" title="' + alt + '" class="fancybox"></a>');
    });
    $(this).find('.fancybox').each(function () {
        $(this).attr('rel', 'article');
    });
});
$(document).ready(function () {
    $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']").attr('rel', 'gallery').fancybox({
        helpers: {
            title: {type: 'inside'}
        }
    });
});