angular.
    module('userAuth').
    component('userAuth', {
        templateUrl: 'user-auth/user-auth.template.html',
        controller: function UserAuthController($http, $q, $window, $rootScope, $location, $route, AuthenticationService) {
            var self = this;

            var deferred = $q.defer();

            self.currentuser = new Object();

            self.currentuser = AuthenticationService.loadUserFromCookie();
            // $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
            $http.get('http://localhost:8080/onlinecollaboration/user/allawaitingauth').then(function (response) {
                console.log(response);
                self.users = response.data;
                //console.log(self.users[0].fname);
                //console.log(self.users[0].sname);

                console.log("self.currentuser = ");
                console.log(self.currentuser);
                console.log(self.currentuser.email);
            }, function (error) {
                console.log("inside error in acceptFriendClicked");
                //console.log(error);
                //console.log(error.data.fname);

                deferred.reject(error);

            }
            );

            self.homeClicked = function homeClicked() {
                window.location = "/#!/home";
            };

           self.authUserClicked = function authUserClicked(user) {

                var deferred = $q.defer();

                console.log("Add as friend clicked");
                console.log("From: " + self.currentuser.userid + " to " + user.userid);

                user.phoneno = self.currentuser.userid;

                $http.post('http://localhost:8080/onlinecollaboration/user/authenticate', user).then(function (response) {
                    console.log('success... authUserClicked');
                    deferred.resolve(response.data);
                    console.log(response.data);

                    $route.reload()

                }, function (error) {
                    console.log("inside error in authUserClicked");
                    //console.log(error);
                    //console.log(error.data.fname);

                    deferred.reject(error);

                }
                );
                return deferred.promise;
            }            

        }

    });