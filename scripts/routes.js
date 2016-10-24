/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('testpage', {
                url: '/testpage',
                templateUrl: 'views/test.html'
            })
            .state('baseinfo', {
                url: '/baseinfo',
                templateUrl: 'views/base-info.dashboards.html'
            })
			.state('facilities', {
                url: '/facilities',
                templateUrl: 'views/base-info.facilities.html'
            })
			.state('meters', {
                url: '/meters',
                templateUrl: 'views/base-info.meters.html'
            })
         .state('physical', {
                url: '/physical',
                templateUrl: 'views/base-info.physical.html'
            })
			.state('facilityunit', {
                url: '/facilityunit',
                templateUrl: 'views/base-info.facility-unit.html'
            })
			.state('facilitybom', {
                url: '/facilitybom',
                templateUrl: 'views/base-info.facility-bom.html'
            })
			.state('energydistribution', {
                url: '/energydistribution',
                templateUrl: 'views/base-info.energy-distribution.html'
            })
			.state('efficientdistribution', {
                url: '/efficientdistribution',
                templateUrl: 'views/base-info.efficient-distribution.html'
            })
			.state('base', {
                url: '/base',
                templateUrl: 'views/blank-page.html'
            })
         .state('manageemissionfactor', {
                url: '/manageemissionfactor',
                templateUrl: 'views/manageemissionfactor.html'
            })
         .state('manageoptimeloadfactor', {
                url: '/manageoptimeloadfactor',
                templateUrl: 'views/manageoptimeloadfactor.html'
            })
             .state('energymonitoring', { //energy monitoring
                url: '/energymonitoring',
                templateUrl: 'views/blank-sub.html'
            })
			.state('monitorenergyconsume', {
                url: '/monitorenergyconsume',
                templateUrl: 'views/monitorenergyconsume.html'
            })
			.state('realtimeenergyconsume', {
                url: '/realtimeenergyconsume',
                templateUrl: 'views/realtimeenergyconsume.html'
            })
      .state('energymanagement', { // energy managements
                url: '/energymanagement',
                templateUrl: 'views/blank-sub.html'
            })
			.state('setbau', {
                url: '/setbau',
                templateUrl: 'views/setbau.html'
            })
			.state('setkpi', {
                url: '/setkpi',
                templateUrl: 'views/setkpi.html'
            })
         .state('setgoal', {
                url: '/setgoal',
                templateUrl: 'views/setgoal.html'
            })
			.state('evalgoal', {
                url: '/evalgoal',
                templateUrl: 'views/evalgoal.html'
            })
            .state('energyachievement', { //energy achievement
                url: '/energyachievement',
                templateUrl: 'views/blank-sub.html'
            })
         .state('define', {
                url: '/define',
                templateUrl: 'views/variabledefine.html'
            })
			.state('register', {
                url: '/register',
                templateUrl: 'views/variableregister.html'
            })
      
			.state('setbaseline', {
                url: '/setbaseline',
                templateUrl: 'views/setbaseline.html'
            })
         .state('evaluationenergy', {
                url: '/evaluationenergy',
                templateUrl: 'views/evaluationenergy.html'
            })
             .state('energyefficiency', { //energy efficiency
                url: '/energyefficiency',
                templateUrl: 'views/blank-sub.html'
            })
			.state('manageoperationdata', {
                url: '/manageoperationdata',
                templateUrl: 'views/manageoperationdata.html'
            })
         .state('monitorenergyefficiency', {
                url: '/monitorenergyefficiency',
                templateUrl: 'views/monitorenergyefficiency.html'
            })
         .state('detailenergyefficiency', {
                url: '/detailenergyefficiency',
                templateUrl: 'views/detailenergyefficiency.html'
            })
             .state('greenhousegas', { //green house gas
                url: '/greenhousegas',
                templateUrl: 'views/blank-sub.html'
            })
			.state('monitorghgemission', {
                url: '/monitorghgemission',
                templateUrl: 'views/monitorghgemission.html'
            })
             .state('dashboards', { //Dashboards
                parent: 'secure',
                url: '/dashboards',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl'
            })
			.state('all_monitor', {
                url: '/all_monitor',
                templateUrl: 'views/all_monitor.html'
            });



        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/dashboards');
            $state.go('dashboards');
        });

    }]);
});