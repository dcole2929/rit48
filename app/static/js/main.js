require.config({
	paths: {
		jquery: 'libs/jquery-1.8.3',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone'
	},

	shim: {
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(['app'], function (App){
	App.initialize();
});