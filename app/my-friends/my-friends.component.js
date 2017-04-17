angular.
    module('myFriends').
    component('myFriends', {
        templateUrl: 'my-friends/my-friends.template.html',
        controller: function MyFriendsController($http, $q, $window, $rootScope, $location, AuthenticationService) {
            var self = this;

            self.currentuser = new Object();

            self.currentuser = AuthenticationService.loadUserFromCookie();
            // $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
            $http.post('http://localhost:8080/onlinecollaboration/friend/all', self.currentuser).then(function (response) {
                console.log(response);
                self.users = response.data;
                //console.log(self.users[0].fname);
                //console.log(self.users[0].sname);

                console.log("self.currentuser = ");
                console.log(self.currentuser);
                console.log(self.currentuser.email);
            });

                     self.homeClicked = function homeClicked() {
                        window.location = "/#!/home";
                     };                         

        }

    });