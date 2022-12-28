// ==UserScript==
// @name        Force SSL Torrent Invites
// @description force HTTPS on torrentinvites.org
// @version     1.0.2
// @author      moosedookie
// @icon        https://moosedookie.github.io/CustomUserScripts/ForceSSLTorrentInvites/icon.png
// @homepage    https://github.com/moosedookie/CustomUserScripts
// @namespace   https://moosedookie.github.io/CustomUserScripts/ForceSSLTorrentInvites
// @grant       unsafeWindow
// @run-at      document-start
// @match       http://torrentinvites.org/*
// @updateURL   https://moosedookie.github.io/CustomUserScripts/ForceSSLTorrentInvites/Force-SSL-Torrent-Invites.user.js
// @downloadURL https://moosedookie.github.io/CustomUserScripts/ForceSSLTorrentInvites/Force-SSL-Torrent-Invites.user.js
// ==/UserScript==

if (window.location.protocol != "https:") window.location.protocol = "https:";