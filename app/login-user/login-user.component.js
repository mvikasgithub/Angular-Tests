'use strict'

//Register 'loginUser' component along with its associated controller and template
angular.
    module('loginUser').
    component('loginUser', {
        templateUrl: 'login-user/login-user.template.html',
        controller: function LoginUserController($http, $q, $window, $rootScope, $location, AuthenticationService) {
            var self = this;
            self.user = new Object();

            // method for user login
            self.login = function (user) {

                console.log("inside login-user.component login() function");


                AuthenticationService.login(self.user).then(
                    function (user) { // success function
                        AuthenticationService.setUserIsAuthenticated(true);
                        AuthenticationService.setRole(user.role);
                        $rootScope.authenticated = true;
                        $rootScope.message = "Welcome" + user.username;
                        AuthenticationService.saveUser(user);

                        console.log("After invoking AuthenticationService.login");
                        console.log(user.fname);
                        window.location = "/#!/home";

                    },
                    function (error) {
                        console.log("inside error in login-user.component->login()");
                        console.log(error);
                        self.user = error.data;
                        console.log(self.user.fname);
                        self.message = self.user.fname;
                        $window.scrollTo(0, 0); // scroll to top to display the message
                        
                    }

                );

            }
        }
    });

