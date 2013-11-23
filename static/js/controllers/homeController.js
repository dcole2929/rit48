define([
	'jquery',
	'underscore',
	'backbone',
	'views/homeView'
], function ($, _, Backbone, HomeView){

	var HomeController = Backbone.Controller.extend({

		routes : {
			'' : "home"
		},

		home: function() {
			alert("something");
			var HomePage = new HomeView();
			homePage.render();
		}
	});


	return HomeController;
});