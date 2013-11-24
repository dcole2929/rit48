define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'collections/eventCollection',
	'views/eventTileView',
	'text!../../templates/carousel_template.htm',
	'text!../../templates/mainnav_template.htm',
	'text!../../templates/tile_template.htm'
], function ($, _, Backbone, Bootstrap, EventCollection, EventTileView, CarouselTemplate, MainNav, EventTile) {

	'use strict';

	var list = [
		{'src':'static/img/baboon_Composite.jpg' ,'title':'Monkey', 'descr': 'blue monkey or something'},
		{'src':'static/img/MauiLab.jpg' ,'title':'House', 'descr': 'house kind of looks like shit'},
		{'src':'static/img/olivia-munn.jpg' ,'title':'Hot Girl', 'descr': 'Olivia Munn can get it'},
		{'src':'static/img/alison-brie.jpg' ,'title':'Hot Girl 2', 'descr': 'Alison Brie is cool too I guess'},
		{'src':'static/img/Box.jpg' ,'title':'Box', 'descr': 'some words or something'}
	];

	var homeView = Backbone.View.extend({
		el: '#container',

		events: {

		},

		initialize: function() {
			var me = this;
			this.$liCarousel =  this.$('#carouselTargets');
			this.$citems = this.$('#citems');
			this.$navbar = this.$('#mainNav');
			this.$eventList = this.$('#event-list');

			// Bind to collections events
			//this.listenTo(EventCollection, 'all', this.render);
			EventCollection.fetch({
				success: function() {
					me.render();
				},
				error: function() {
					console.log("error: failed to fetch");
				}
			});

		},

		render: function() { 
			// var banner = document.createElement("img");
			// banner.setAttribute("src", "static/img/baboon_Composite.jpg");
			// banner.setAttribute("height",512);
			// banner.setAttribute("width",512);
			// this.$banner.append(banner);

			this.render_carousel();
			this.render_tiles();
			this.render_nav(); 
			
		},

		render_carousel: function () {
			var template = _.template(CarouselTemplate);
			for (var i = 0; i < 5; i++) {
				var li = document.createElement("li");
				li.setAttribute('data-target', '#myCarousel');
				li.setAttribute('data-slide', i);
				if (i == 0) li.className += 'active';
				this.$liCarousel.append(li);
				this.$citems.append(template(list[i]));

			}

			this.$citems.children(".item")[0].className += ' active';

			$('.carousel').carousel();
		},

		render_nav: function() {
			var template = _.template(MainNav);
			this.$navbar.append(template({"linkTo": '#', 'text': 'Who\'s In!?'}));
			var ul = this.$navbar.find('ul');
			ul.append('<li class="active"><a href="#">Home</a></li>');
			ul.append('<li class="active"><a href="#">About</a></li>');
			ul.append('<li class="active"><a href="#">Contact</a></li>');
		},

		render_tiles: function() {
			//this.$eventList
			var template = _.template(EventTile);
			for (var i = 0; i < 5; i++) {
				var row = $('<div>');
				$(row).addClass("row");
				for (var j = 0; j < 4; j++) {
					console.log(i * 4 + j);
					$(row).appendTo(template(EventCollection.at(i * 4 + j).toJSON()));
				}
				this.$eventList.append(row); 
			}


		}

	});

	return homeView;

});