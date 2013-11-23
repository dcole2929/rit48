define([
    'jquery',
    'underscore',
    'backbone',
    'controllers/homeController'
], function ($, _, Backbone, HomeController) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '' : 'home',
            '*actions': 'defaultAction'
        }

    });

    var initialize = function () {
        var app_router = new AppRouter;
        app_router.on('home', function () {
            var home = new HomeController();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});