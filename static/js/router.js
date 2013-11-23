define([
    'jquery',
    'underscore',
    'backbone',
    'views/homeView'
], function ($, _, Backbone, HomeView) {

    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            'home' : 'home',
            '*actions': 'defaultAction'
        }

    });

    var initialize = function () {
        var app_router = new AppRouter;
        console.log("App router made");
        app_router.on('route:home', function () {
            var homeView = new HomeView();
            homeView.render();
            console.log("after render");
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});