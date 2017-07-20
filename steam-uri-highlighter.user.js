// ==UserScript==
// @name         GMail Steam URL highlighter
// @namespace    http://tampermonkey.net/
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.slim.min.js
// @require https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @version      1.0
// @description  Replace Steam URI's in GMail with actual links
// @author       deiga
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const steamUrlReplacer = function () {
        const elem = Array.from(document.querySelectorAll('.gs div')).filter(function(item) { return item.textContent.indexOf('steam://') > -1; })[0];
        if (elem) {
            var elemHtml = elem.innerHTML;
            if (elemHtml.indexOf('href="steam://') === -1) {
                elem.innerHTML = elemHtml.replace(/steam:\/\/.*$/m,'<a href="$&">$&</a>');
                elem.innerHTML = elem.innerHTML.replace('<wbr>','');
            }
        }
    };

    waitForKeyElements (".gs div:contains('steam://')", steamUrlReplacer);
})();
