'use strict'

angular.
    module('registerUser').
        component('registerUser', {
            templateUrl: 'register-user/register-user.template.html',
            controller: function RegisterUserController() {

                var self = this;
                                
                
                self.register = function register(user){
                    console.log(self.user);
                    console.log(self.confirmPassword);

                    if(self.user.password != self.confirmPassword){
                        self.message = "Passwords do not match. Re-enter password";
                        self.confirmPassword = "";
                        self.user.password = "";
                    }
                    else
                        self.message = "Registration Successful";
                        
                }

            }
        });