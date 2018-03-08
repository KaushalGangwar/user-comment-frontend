/**
 * Created by kaushal on 08/03/18.
 */
var login = angular.module('loginModule',[]);
login.controller('loginController',['$state','$http',function ($state,$http) {

    var vm = this;
    vm.validate = function () {
       console.log("name is "+vm.user.name);
        console.log("pass is "+vm.user.pass);
        



        $http.post(base + '/users/register_user',{
            username : vm.user.name,
            email : vm.user.pass
        }).then(function (success) {
            if(success.data.flag == 200) {
                localStorage.setItem('user',JSON.stringify(success.data.data));
                $state.go('main');
            } else {
                alert(success.data.message);
            }
        })


    }


}]);