'use strict'

//Register 'basicConnection' component along with its associated controller and template
angular.
    module('basicConnection').
        component('basicConnection', {
            templateUrl: 'basic-connection/basic-connection.template.html',
            controller:  function BasicConnectionController($http) {
                this.message = "Hello World";
                this.users = [];

                $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
                console.log(response);
                self.users = response.data;
                console.log(users[0].fname);
            });


            }

        });