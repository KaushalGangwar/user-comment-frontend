/**
 * Created by kaushal on 08/03/18.
 */
var login = angular.module('mainModule',[]);
login.controller('mainController',['$timeout','$http','$state',function ($timeout,$http,$state) {

    if(!localStorage.getItem('user')) {
        $state.go('login');
    }
    var user = JSON.parse(localStorage.getItem("user"));

     var vm = this;
     vm.messages = [];
     vm.fetchMessages = fetchMessages;
     vm.reply = reply;
     vm.comment = comment;
     vm.deleteComment = deleteComment;


    function fetchMessages(scroll) {

        $http.get(base + '/view_comments').then(function (success) {
            if(success.data.flag == 200) {
                vm.messages = success.data.data;
                if(!scroll) {
                    $timeout(function () {
                        var element = document.getElementsByClassName('chat-section')[0];
                        if(element) {
                            element.scrollTop = element.scrollHeight;
                        }
                    })
                }

            } else {
                alert("Some error Occurred!");
                $state.go("login");

            }
        });
    }

    fetchMessages();

    function reply(id,index) {

        var element = document.getElementById(id);
        if(!element || !element.value) return;

        var message = element.value;
        var comment_id = vm.messages[index].comment_id;

        $http.post(base + '/reply',{
            username : user.username,
            user_id : user.user_id,
            comment : message,
            comment_id : comment_id
        }).then (function (success) {
            if(success.data.flag == 200) {
                element.value = '';
                fetchMessages(true);
            } else {
                alert(success.data.message);
            }
        })

    }

    function deleteComment(obj,type) {

        var id = obj.comment_id;

        $http.post(base + '/delete',{
            comment_id : id,
            is_reply : type
        }).then(function (success) {
            if(success.data.flag == 200) {
                fetchMessages(true);
            } else {
                alert(success.data.message);
            }
        })

    }

    function comment(id) {

        var element = document.getElementById(id);
        if(!element || !element.value) return;
        
        $http.post(base + '/post_comment',{
            username : user.username,
            user_id : user.user_id,
            comment : element.value
        }).then(function (success) {
            if(success.data.flag == 200) {
              element.value = '';
                fetchMessages();
            } else {
                alert(success.data.message);
            }
        })

    }

}]);