/**
 * Created by kaushal on 08/03/18.
 */

var base = 'http://localhost:8080';

var route = angular.module('chatApp',['ui.router','loginModule','mainModule']);

route.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('login', {
            url : '/login',
            templateUrl : 'app/components/login/login.html',
            controller : 'loginController',
            controllerAs : 'login'
        }) .state('main', {
            url : '/main',
            templateUrl : 'app/components/main/main.html',
            controller : 'mainController',
            controllerAs : 'main'
        })

    }]);

route.run(['$state','$timeout',function ($state,$timeout) {
    $timeout(function() {
        if(localStorage.getItem('user')) {
            $state.go('main');
        }
    });
}])

function showLoader() {
    
    var ele = document.getElementById('loader');
    if(!ele) return;
    ele.hidden = false;
    
}

function hideLoader() {

    var ele = document.getElementById('loader');
    if(!ele) return;
    ele.hidden = true;

}