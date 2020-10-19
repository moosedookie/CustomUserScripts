// ==UserScript==
// @name        X2Convert Button
// @description X2Convert Downloader: Download Audio for free
// @version     1.2.1
// @author      moosedookie, X2Convert
// @homepage    https://github.com/moosedookie/CustomUserScripts/X2ConvertButton
// @icon        https://moosedookie.github.io/CustomUserScripts/X2ConvertButton/logo.png
// @namespace   https://x2convert.com/
// @include     https://youtube.com/*
// @include     https://m.youtube.com/*
// @include     https://www.youtube.com/*
// @include     https://youtu.be/*
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @run-at      document-end
// @noframes
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     x2convert.com
// @connect     self
// @connect     *
// @require     https://moosedookie.github.io/CustomUserScripts/X2ConvertButton/srp.js
// @updateURL   https://moosedookie.github.io/CustomUserScripts/X2ConvertButton/X2ConvertButton.user.js
// @downloadURL https://moosedookie.github.io/CustomUserScripts/X2ConvertButton/X2ConvertButton.user.js
// ==/UserScript==

var X2C={oXHttpReq:null,vid:null,old_url:null,DocOnLoad:function(e){try{if(null!=e&&null!=e.body&&null!=e.location&&(X2C.vid=X2C.getVid(e),X2C.vid)){e.querySelector("#info-contents #info").setAttribute("style","flex-wrap: wrap;");var t=e.querySelector("#columns").querySelector("#player"),o=e.querySelector("#x2_button"),n=X2C.DownButton(),r=`[{"ai":"x2convert","oi":"${X2C.vid}","an":"v","sd":0,"main":1,"efl":[{"nam":"show button","adu":true}],"pl":[{"k":"vid","v":"show button"},{"k":"src","v":"ext"},{"k":"site","v":"youtube"}]}]`,i=new XReport("x2convert",r);null==o&&(null!=t?(console.log("x"),t.parentNode.insertBefore(n[0],t.nextSibling),t.parentNode.insertBefore(n[1],t.nextSibling),i.send()):(console.log("y"),(t=e.querySelector("#eow-title")).parentNode.insertBefore(n[0],t),(t=e.querySelector("#eow-title")).parentNode.insertBefore(n[1],t),i.send())),X2C.old_url=e.location.href,X2C.checkChangeVid(),null!=o&&i.send()}return!0}catch(e){console.log("DocOnLoad. ",e)}},checkChangeVid:function(){setTimeout(function(){X2C.old_url==window.location.href?X2C.checkChangeVid():X2C.WaitLoadDom(window.document)},1e3)},WaitLoadDom:function(e){X2C.vid=X2C.getVid(e),X2C.vid?null!=e.querySelector("#info #menu-container")?X2C.DocOnLoad(e):setTimeout(function(){X2C.WaitLoadDom(e)},1e3):X2C.checkChangeVid()},goX2:function(e,t){try{var o=`[{"ai":"x2convert","oi":"${t}","an":"c","sd":0,"main":1,"efl":[{"nam":"${t}","adu":true}],"pl":[{"k":"vid","v":"${X2C.vid}"},{"k":"src","v":"ext"},{"k":"site","v":"youtube"}]}]`;new XReport("x2convert",o).send()}catch(t){}try{var n=`https://x2convert.com/${e}/LinkYoutube?link=https://www.youtube.com/watch?v=${X2C.vid}&utm_source=chrome_addon&x2c=chrome`;"mp3"===t&&(n=`https://x2convert.com/${e}/download-youtube-to-mp3-music?link=https://www.youtube.com/watch?v=${X2C.vid}&utm_source=chrome_addon&x2c=chrome`),window.open(n,"_blank")}catch(t){console.log("ButtonClick. ",t)}},DownButton:function(){try{var e="en";try{e=(e=document.documentElement.lang).substring(0,e.indexOf("-")),console.log(e)}catch(e){}var t="Download Video",o="Download Mp3";switch(e){case"de":t="Video herunterladen",o="MP3 herunterladen";break;case"fr":t="Télécharger la Video",o="Télécharger MP3";break;case"it":t="Scarica Video",o="Scarica Mp3";break;case"ja":t="ビデオをダウンロード",o="Mp3をダウンロード";break;case"ko":t="비디오 다운로드",o="Mp3 다운로드";break;case"pt":t="Baixar Video",o="Baixar Mp3";break;case"ru":t="Скачать видео",o="Скачать Mp3";break;case"zh":t="影片下载",o="下载MP3";break;case"th":t="ดาวน์โหลดวิดีโอ",o="ดาวน์โหลด Mp3";break;case"vi":t="Tải Video",o="Tải Mp3"}var n=document.createElement("button"),r=document.createElement("button");return r.className="yt-uix-tooltip",r.setAttribute("type","button"),r.setAttribute("title","Download with x2convert.com"),r.innerHTML=o,r.addEventListener("click",function(t){X2C.goX2(e,"mp3")}),n.id="x2_button",n.className="yt-uix-tooltip",n.setAttribute("type","button"),n.setAttribute("title","Download with x2convert.com"),n.innerHTML=t,n.addEventListener("click",function(t){X2C.goX2(e,"video")},!0),n.setAttribute("style","text-shadow: transparent 0px 1px 1px;box-shadow: #fff 0px 1px 1px;white-space: nowrap;vertical-align: middle;color: #fffdfd;cursor: pointer;border-width: 1px;border-style: solid;border-color: #ddd;border-image: initial; border-radius: 5px;font: bold 13px sans-serif;padding: 6px 10px;background:#065fd4;margin-top:10px"),n.setAttribute("onmouseover","this.style.backgroundColor='#c00'"),n.setAttribute("onmouseout","this.style.backgroundColor='#065fd4'"),r.setAttribute("style","text-shadow: transparent 0px 1px 1px;box-shadow: #fff 0px 1px 1px;white-space: nowrap;vertical-align: middle;color: #fffdfd;cursor: pointer;border-width: 1px;border-style: solid;border-color: #ddd;border-image: initial; border-radius: 5px;font: bold 13px sans-serif;padding: 6px 10px;background:#065fd4;margin-top:10px"),r.setAttribute("onmouseover","this.style.backgroundColor='#c00'"),r.setAttribute("onmouseout","this.style.backgroundColor='#065fd4'"),[n,r]}catch(n){console.log("DownButton. ",n)}},getVid:function(e){var t=e.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);return!(!t||!t[3])&&t[3]}};X2C.WaitLoadDom(window.document);