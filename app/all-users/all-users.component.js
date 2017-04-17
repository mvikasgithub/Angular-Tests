angular.
    module('allUsers').
    component('allUsers', {
        templateUrl: 'all-users/all-users.template.html',
        controller: function AllUsersController($http, $q, $window, $rootScope, $location, $route, AuthenticationService) {
            var self = this;

            self.message = "All Users clicked";
            this.users = [];
            self.menuoption = 2;
            self.currentuser = new Object();
            self.currentuser.email = "";

            self.currentuser = AuthenticationService.loadUserFromCookie();
            // $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
            $http.post('http://localhost:8080/onlinecollaboration/user/allbutme', self.currentuser).then(function (response) {
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

            self.addAsFriendClicked = function addAsFriendClicked(user) {

                var deferred = $q.defer();

                console.log("Add as friend clicked");
                console.log("From: " + self.currentuser.userid + " to " + user.userid);

                user.phoneno = self.currentuser.userid;

                $http.post('http://localhost:8080/onlinecollaboration/friend/addfriend', user).then(function (response) {
                    console.log('success');
                    deferred.resolve(response.data);
                    console.log(response.data);

                    $route.reload()

                }, function (error) {
                    console.log("inside error in addAsFriendClicked");
                    //console.log(error);
                    //console.log(error.data.fname);

                    deferred.reject(error);

                }
                );
                return deferred.promise;
            }

            self.acceptFriendClicked = function acceptFriendClicked(user) {

                var deferred = $q.defer();

                console.log("Accept friend clicked");
                console.log("Friend Request accepted by: " + self.currentuser.userid + " initaited by " + user.userid);

                user.phoneno = self.currentuser.userid;

                $http.post('http://localhost:8080/onlinecollaboration/friend/acceptfriend', user).then(function (response) {
                    console.log('success');
                    deferred.resolve(response.data);
                    console.log(response.data);

                    $route.reload()

                }, function (error) {
                    console.log("inside error in acceptFriendClicked");
                    //console.log(error);
                    //console.log(error.data.fname);

                    deferred.reject(error);

                }
                );
                return deferred.promise;
            }

        }

    });