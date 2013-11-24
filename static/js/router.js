define([
    'jquery',
    'underscore',
    'backbone',
    'views/homeView',
    'views/eventView'
], function ($, _, Backbone, HomeView, EventView) {

    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '' : 'home',
            "event/:id": "getEvent",
            '*actions': 'defaultAction'
        }

    });

    var initialize = function () {
        var app_router = new AppRouter;

        app_router.on('route:home', function () {
            var homeView = new HomeView();
        });

        app_router.on('route:getEvent', function (id) {
            var eventView = new EventView();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});