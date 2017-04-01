'use strict'

//Register 'loginUser' component along with its associated controller and template
angular.
    module('loginUser').
        component('loginUser', {
            templateUrl: 'login-user/login-user.template.html',
            controller:  function LoginUserController($http, $q, $window) {
            var self = this;
            self.user = new Object();

            self.login = function login(user){

                var deferred = $q.defer();

                $http.post('http://localhost:8080/onlinecollaboration/user/login', self.user).then(
                    function (response) {
                        deferred.resolve(response.data);
                        console.log(response.data);
                        console.log("inside response");
 
                    },
                    function (error) {
                        console.log("inside error");
                        console.log(error.data.responseCode);
                        console.log(error.data.responseMessage);

                        if (error.data.responseCode == '500')
                        {
                            self.message = "Username does not exist"                        
                            $window.scrollTo(0, 0); // scroll to top to display the message
                        }
                        if(error.data.responseCode == '501')
                        {
                            self.message = "Wrong Password. Try Again !"                        
                            $window.scrollTo(0, 0); // scroll to top to display the message                            
                        }
                        deferred.reject(error);
   
                    }
                );
            }

            }

        });