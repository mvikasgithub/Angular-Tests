'use strict'

angular.
    module('registerUser').
    component('registerUser', {
        templateUrl: 'register-user/register-user.template.html',
        controller: function RegisterUserController($http, $q, $window) {

            var self = this;
            self.user = new Object();
            self.user.role = 'STUDENT';


            self.register = function register(user) {
                //console.log(self.user);
                //console.log(self.confirmPassword);

                var deferred = $q.defer();

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
                        console.log("inside response");
                        $window.location.href = '/#!/login';
                    },
                    function (error) {
                        console.log("inside error");
                        console.log(error.data.responseCode);
                        console.log(error.data.responseMessage);

                        if (error.data.responseCode == '500')
                        {
                            self.message = "Duplicate Username (email id). Try again";   
                            $window.scrollTo(0, 0); // scroll to top to display the message
                        }
                        deferred.reject(error);
                    }
                );

                return deferred.promise;

            }

        }
    });