// ==UserScript==
// @name        MTV - Infinite Scroll
// @description Enables infinite scroll
// @version     0.62
// @author      moosedookie, Thrawn
// @homepage    https://github.com/moosedookie/CustomUserScripts/mtv-Infinite-Scroll
// @match       https://www.morethan.tv/torrents.php*
// @match       https://orpheus.network/torrents.php*
// @grant       none
// @updateURL   https://moosedookie.github.io/CustomUserScripts/mtv-Infinite-Scroll/mtv-Infinite-Scroll.user.js
// @downloadURL https://moosedookie.github.io/CustomUserScripts/mtv-Infinite-Scroll/mtv-Infinite-Scroll.user.js
// ==/UserScript==

// Find the pager and the next button
var pixelThreshold = 250;
var $content = $('table.torrent_table tbody');
var load = false;

var addNextPage = function addNextPage() {
    var offset = $("div.linkbox").last().offset().top - pixelThreshold;
    var height  = window.innerHeight;
    var scrollY = window.scrollY;

    if ((!load) && (scrollY > (offset - height) || (offset < height))) {
        load = true;

        var $next = $("div.linkbox a:contains('Next')");
        if($next.length > 0) {
            var url = $next.attr('href');

            $content.append(
                $("<tr/>").append($("<td/>", {colspan:9}).text("---PAGEBREAK---"))
            );

            $.ajax({
                url: url,
                success: (html) => {
                    var $html = $(html);
                    $content.append($html.find('table.torrent_table tbody').html());
                    $("div.linkbox").html($html.find("div.linkbox").last());
                    offset = $("div.linkbox").last().offset().top - pixelThreshold;
                    load = false;
                    addNextPage();
                },
                error: (error) => console.log(error)
            });
        }
    }
};

addNextPage();
$(window).scroll(addNextPage);
