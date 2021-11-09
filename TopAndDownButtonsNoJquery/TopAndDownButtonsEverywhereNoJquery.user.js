// ==UserScript==
// @name        TopAndDownButtonsEverywhere (no Jquery)
// @description Top and Down buttons everywhere with No Jquery making it compatible with most sites.
// @version     1.6.1
// @author      2019-2021 moosedookie, 2014-2016 Max Max v1.6
// @license     MIT
// @icon        https://moosedookie.github.io/CustomUserScripts/TopAndDownButtonsNoJquery/icon.png
// @homepage    https://github.com/moosedookie/CustomUserScripts/tree/main/TopAndDownButtonsNoJquery
// @namespace   https://github.com/moosedookie/CustomUserScripts
// @orig-auth   https://greasyfork.org/en/scripts/22484-topanddownbuttonseverywhere
// @include     *
// @grant       none
// @run-at      document-end
// @updateURL   https://moosedookie.github.io/CustomUserScripts/TopAndDownButtonsNoJquery/TopAndDownButtonsEverywhereNoJquery.user.js
// @downloadURL https://moosedookie.github.io/CustomUserScripts/TopAndDownButtonsNoJquery/TopAndDownButtonsEverywhereNoJquery.user.js
// ==/UserScript==

// [1] skip all iframe
if (window.self != window.top) {
	return
}

// create element
function ce(n) {
	return document.createElement(n);
} // end of function

// add style
function addStyle(css) {
	var head = document.head || document.getElementsByTagName('head')[0];
	if (head) {
		var style = ce("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	} // end if
} // end of function

// global variables
var position,
	// figure out if this is moz || IE because they use documentElement
	el = (navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('MSIE') != -1) ? document.documentElement : document.body,
	// timer
	t1, t2,
	// speed by
	speed_by_click = 500, // edit this value
	speed_by_over = 100, // edit this value
	// z-index
	zIindex = 1001; // edit this value

// move up
function move_up() {
	position = document.documentElement.scrollTop || document.body.scrollTop;
	window.scrollTo(0, position - 1);
	t1 = setTimeout(move_up, speed_by_over);
} // end of function

// move downn
function move_dn() {
	position = document.documentElement.scrollTop || document.body.scrollTop;
	window.scrollTo(0, position + 1);
	t2 = setTimeout(move_dn, speed_by_over);
} // end of function

// document height
function getDocumentHeight() {
	return (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
} // end of function

// document scroll
function get_scroll(a) {
	var d = document,
		b = d.body,
		e = d.documentElement,
		c = "client" + a,
		a = "scroll" + a;
	return /CSS/.test(d.compatMode) ? (e[c] < e[a]) : (b[c] < b[a])
} // end of function

// calk
function scrollTo(element, to, duration) {
	var start = element.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20,
		newDuration = (typeof(duration) === 'undefined') ? 500 : duration;

	var animateScroll = function() {
		currentTime += increment;
		var val = Math.easeInOutQuad(currentTime, start, change, newDuration);
		element.scrollTop = val;
		if (currentTime < newDuration) {
			setTimeout(animateScroll, increment);
		}
	};
	animateScroll();
} // end of function

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

// add css
function shareCSS() {
	// variables
	var s = '',
		img_up, img_dn;

	// img vs button
	img_up = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHN0eWxlPSItbXMtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyI+PHBhdGggZD0iTTMzNCA2MjRoNDYuOWMxMC4yIDAgMTkuOS00LjkgMjUuOS0xMy4yTDUxMiA0NjUuNGwxMDUuMiAxNDUuNGM2IDguMyAxNS42IDEzLjIgMjUuOSAxMy4ySDY5MGM2LjUgMCAxMC4zLTcuNCA2LjUtMTIuN2wtMTc4LTI0NmE3Ljk1IDcuOTUgMCAwIDAtMTIuOSAwbC0xNzggMjQ2QTcuOTYgNy45NiAwIDAgMCAzMzQgNjI0eiIgZmlsbD0iIzYyNjI2MiIvPjxwYXRoIGQ9Ik04ODAgMTEySDE0NGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NzM2YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDczNmMxNy43IDAgMzItMTQuMyAzMi0zMlYxNDRjMC0xNy43LTE0LjMtMzItMzItMzJ6bS00MCA3MjhIMTg0VjE4NGg2NTZ2NjU2eiIgZmlsbD0iIzYyNjI2MiIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9InJnYmEoMCwgMCwgMCwgMCkiIC8+PC9zdmc+';
	img_dn = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHN0eWxlPSItbXMtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyI+PHBhdGggZD0iTTUwNS41IDY1OC43YzMuMiA0LjQgOS43IDQuNCAxMi45IDBsMTc4LTI0NmMzLjgtNS4zIDAtMTIuNy02LjUtMTIuN0g2NDNjLTEwLjIgMC0xOS45IDQuOS0yNS45IDEzLjJMNTEyIDU1OC42TDQwNi44IDQxMy4yYy02LTguMy0xNS42LTEzLjItMjUuOS0xMy4ySDMzNGMtNi41IDAtMTAuMyA3LjQtNi41IDEyLjdsMTc4IDI0NnoiIGZpbGw9IiM2MjYyNjIiLz48cGF0aCBkPSJNODgwIDExMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjczNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tNDAgNzI4SDE4NFYxODRoNjU2djY1NnoiIGZpbGw9IiM2MjYyNjIiLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDApIiAvPjwvc3ZnPg==';
	// button id
	s += '#play_btn_up { position:fixed; right:0; bottom:53%;z-index:' + zIindex + '; height:36px; width:36px; cursor:pointer; background:url(' + img_up + ') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }';
	s += '#play_btn_dn { position:fixed; right:0; top:53%;   z-index:' + zIindex + '; height:36px; width:36px; cursor:pointer; background:url(' + img_dn + ') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }';
	// button class
	s += '.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }';
	s += '.play_btn:hover { opacity:1; }';
	// append
	addStyle('' + s);
} // end of function

// main
function create_btn_element() {
	// get scroll
	var up, dn,
		scrolled,
		h = get_scroll('Height');
	// exit
	if (!h) {
		return;
	} // end if

	// add css
	shareCSS();

	// if
	if (el) {
		// create DOM element
		up = ce('span');
		dn = ce('span');
		// set attribute
		up.setAttribute('id', 'play_btn_up');
		dn.setAttribute('id', 'play_btn_dn');
		// set class
		up.className = "play_btn";
		dn.className = "play_btn";
		// append element
		document.body.appendChild(up);
		document.body.appendChild(dn);

		// scroll
		scrolled = window.pageYOffset || document.documentElement.scrollTop;
		// if scroll
		up.style.display = (scrolled > 0) ? "" : "none";

		// add event over
		up.addEventListener('mouseover', move_up, false);
		dn.addEventListener('mouseover', move_dn, false);
		// add event out
		up.addEventListener('mouseout', function() {
			clearTimeout(t1);
		}, false);
		dn.addEventListener('mouseout', function() {
			clearTimeout(t2);
		}, false);
		// add event click
		up.addEventListener('click', function() {
			scrollTo(el, 0, speed_by_click);
		}, false);
		dn.addEventListener('click', function() {
			scrollTo(el, getDocumentHeight(), speed_by_click);
		}, false);

		// add event scroll
		window.onscroll = function() {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop,
				diffHeight = document.body.scrollHeight - window.innerHeight;
			// if scroll up
			up.style.display = (scrolled > 0) ? "" : "none";
			// if scroll dn
			dn.style.display = (diffHeight > scrolled) ? "" : "none";
		}; // end of function
	} // end if
} // end of function

// run it
create_btn_element();