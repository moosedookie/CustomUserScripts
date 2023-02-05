// ==UserScript==
// @name         Sonarr & Radarr Link Adder
// @description  Adds links to specified series/movies
// @version      1.0
// @author       moosedookie
// @icon         https://moosedookie.github.io/CustomUserScripts/SonarrAndRadarrLinkAdder/icon.png
// @homepage     https://github.com/moosedookie/CustomUserScripts
// @namespace    https://moosedookie.github.io/CustomUserScripts/SonarrAndRadarrLinkAdder
// @grant        none
// @run-at       document-start
// @include      https://tv.moosedookie.me/*
// @include      https://movies.moosedookie.me/*
// @include      http://192.168.33.134:8989/*
// @include      http://192.168.33.134:7878/*
// @updateURL    https://moosedookie.github.io/CustomUserScripts/SonarrAndRadarrLinkAdder/SonarrAndRadarrLinkAdder.user.js
// @downloadURL  https://moosedookie.github.io/CustomUserScripts/SonarrAndRadarrLinkAdder/SonarrAndRadarrLinkAdder.user.js
// ==/UserScript==

(function() {
	'use strict';

	// define what links to add to series/movie on the table list
	// these links will appear as icons to the right of the specified series' or movies' names
	// syntax: [Title, URL, icon] Note: Title must match the series/movie title in the list
	let tableLinks = [
		//['Boruto: Naruto Next Generations', 'https://animekaizoku.com/boruto-naruto-next-generations-34566/', 'https://animekaizoku.com/favicon.ico'],
		//['My Isekai Life', 'https://animekaizoku.com/?s=My+Isekai+Life', 'https://animekaizoku.com/favicon.ico'],
		//['One Piece', 'https://animekaizoku.com/one-piece-21/', 'https://animekaizoku.com/favicon.ico'],
	];

	// define what links to add to the "Links" menu for all series/movies
	// syntax: [Link Title, URL]
	// URL can use following substitutions:
	//    {title} - Link Title
	let menuLinks = [
		//['MyAnimeList', 'https://myanimelist.net/anime.php?q={title}'],
		//['Kaizoku', 'https://animekaizoku.com/?s={title}'],
		//['PSArips', 'https://psa.pm/?s={title}'],
		['TheMovieDB', 'https://www.themoviedb.org/search?query={title}'],
	];

	var tableArray = [];
	tableLinks.forEach(item => {
		tableArray.push(item[0])
	});

	var menuArray = [];
	menuLinks.forEach(item => {
		menuArray.push(item[0])
	});

	// Options for the observer (which mutations to observe: attributes, childList, subtree, characterData)
	const config = {
		attributes: true,
		childList: true,
		subtree: true
	};

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {

		// Use traditional 'for loops' for IE 11
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				//console.log('A child node has been added or removed.');
				//console.log(mutation)
				//console.log(mutation.target.classList)
				if (mutation.target.classList.length > 0) {
					// Adding links to titles on series table view
					if (tableLinks.length > 0 && (mutation.target.classList[0].startsWith('MovieIndex-contentBodyContainer') || mutation.target.classList[0].startsWith('SeriesIndex-contentBodyContainer') || mutation.target.classList[0].startsWith('VirtualTableRow') || mutation.target.classList[0].startsWith('ReactVirtualized__Grid__innerScrollContainer'))) {
						$(mutation.target).find('a').filter(function() {
							return tableArray.includes($(this).text()) && $(this).parent().find('a').length < 2
						}).each(function(index) {
							//console.log( $( this ).text() );
							tableLinks.forEach(item => {
								if (item[0] == $(this).text())
									$('<a href="' + item[1] + '" target="_blank"><img src="' + item[2] + '" width=25 height=20 style="padding:0 5px 0 0;">').insertBefore(this);
							});
						});

					}

					// Adding links to "Links" shortcuts on series view
					if (menuLinks.length > 0 && (mutation.target.classList[0].contains('Tooltip/tooltipContainer/gDO7_') || mutation.target.classList[0].contains('Tooltip-tooltipContainer-gDO7_'))) {
						var linkClass = 'SeriesDetailsLinks-link-RfjeR Link-link-RInnp Link-to-kylTi'
						var spanClass = 'SeriesDetailsLinks-linkLabel-SAKtg Label-label-DYldh Label-info-QWFsu Label-large-qZ9AP'
						var links = $(mutation.target).find('div.SeriesDetailsLinks-links-cHw2_');
						if (links.length === 0) {
							linkClass = 'MovieDetailsLinks-link-RA9Kf Link-link-RInnp Link-to-kylTi'
							spanClass = 'MovieDetailsLinks-linkLabel-GGMIV Label-label-DYldh Label-info-QWFsu Label-large-qZ9AP'
							links = $(mutation.target).find('div.MovieDetailsLinks-links-eFF77');
						}
						if (links.length === 0) continue;
						if (links.find('a').filter(function() {
								return menuArray.includes($(this).text())
							}).length > 0) continue;
						var itemTitle = $('div.SeriesDetails-title-pJv1g,div.MovieDetails-title-yaEzx span').text();
						if (!itemTitle) continue;
						menuLinks.forEach(item => {
							links.append('<a target="_blank" href="' + item[1].replace('{title}', itemTitle) + '" class="' + linkClass + '"><span class="' + spanClass + '">' + item[0] + '</span></a>');
						});
					}
				}
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(document.body, config);

	// Later, you can stop observing
	//observer.disconnect();

})();