/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer'
], function ($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'px.ngBindPolymer'
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', 'PredixUserService', function ($scope, $rootScope, predixUserService) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'KC-Seed Project',
            session: {},
            tabs: [
                {icon: 'fa-tachometer', state: 'testpage', label: '테스트 페이지'},
                {icon: 'fa-file-o', state: 'baseinfo', label: '기준정보', subitems: [
					{state: 'facilities', label: '설비 마스터'},
					{state: 'meters', label: '계측기 정보'},
					{state: 'physical', label: '물리량 정보'},
					{state: 'facilityunit', label: '설비 Unit 정보'},
					{state: 'facilitybom', label: '설비 BOM 정보'},
					{state: 'energydistribution', label: '에너지 배분 기준'},
					{state: 'efficientdistribution', label: '효율 산정 기준'},
					{state: 'base', label: '기준 정보'},
					{state: 'manageemissionfactor', label: '배출계수 관리'},
					{state: 'manageoptimeloadfactor', label: '가동시간&부하율 관리'}
                ]},
				{icon: 'fa-file-o', state: 'energymonitoring', label: '에너지 사용량', subitems: [
					{state: 'monitorenergyconsume', label: '에너지 사용량 조회'},
					{state: 'realtimeenergyconsume', label: '실시간 에너지 조회'}

				]},
				{icon: 'fa-file-o', state: 'energymanagement', label:'에너지 경영', subitems: [
					{state: 'setbau', label: 'BAU 산정'},
					{state: 'setkpi', label: '중요에너지이용 선정'},
					{state: 'setgoal', label: '에너지 목표수립'},
					{state: 'evalgoal', label: '에너지 목표평가'}
				]},
				{icon: 'fa-file-o', state: 'energyachievement', label: '에너지성과', subitems: [{state: 'define', label: '에너지 관련변수정의'},
					{state: 'register', label: '에너지관련변수실적'},
					{state: 'setbaseline', label: '베이스라인 모델수립'},
					{state: 'evaluationenergy', label: '에너지 성과평가'}
				]},
				{icon: 'fa-file-o', state: 'energyefficiency', label: '에너지효율', subitems: [
					{state: 'manageoperationdata', label: '설비 운전 Data 관리'},
					{state: 'monitorenergyefficiency', label: '설비 에너지 효율 조회'},
					{state: 'detailenergyefficiency', label: '에너지 효율 상세 분석'}
				]},
				{icon: 'fa-file-o', state: 'greenhousegas', label: '온실가스', subitems: [
					{state: 'monitorghgemission', label: '온실가스 배출량 조회'}
				]},
				{icon: 'fa-tachometer', state: 'dashboards', label: 'Dashboards', subitems: [
					{state: 'all_monitor', label: '에너지 통합 모니터링'}
				]}
            ]
        };

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'UNAUTHORIZED':
                        //redirect
                        predixUserService.login(toState);
                        break;
                    default:
                        //go to other error state
                }
            }
            else {
                // unexpected error
            }
        });
    }]);


    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});