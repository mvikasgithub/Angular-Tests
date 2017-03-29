'use strict'

angular.
    module('registerUser').
    component('registerUser', {
        templateUrl: 'register-user/register-user.template.html',
        controller: function RegisterUserController($http, $q) {

            var self = this;
            self.user = new Object();
            self.user.role = 'student';


            self.register = function register(user) {
                //console.log(self.user);
                //console.log(self.confirmPassword);

                var deferred = $q.deferred;

                if (self.user.password != self.confirmPassword) {
                    self.message = "Passwords do not match. Re-enter password";
                    self.confirmPassword = "";
                    self.user.password = "";
                }
                else
                    self.message = "Registration Successful";

                $http.post('http://localhost:8080/onlinecollaboration/user/receive', self.user).then(
                    function (response) {
                        deferred.resolve(response.data);
                        console.log(response.data);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    }
                );

            }

        }
    });