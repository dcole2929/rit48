require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		bootstrap: '../bootstrap/js/bootstrap',
		text: 'libs/text',
	},

	shim: {
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"bootstrap": {
			deps: ["jquery"],
			exports: "bootstrap"
		}
	}
});

require(['app'], function (App){
	App.initialize();
});