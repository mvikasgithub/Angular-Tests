'use strict'

//Register 'basicConnection' component along with its associated controller and template
angular.
    module('basicConnection').
    component('basicConnection', {
        templateUrl: 'basic-connection/basic-connection.template.html',
        controller: function BasicConnectionController($http) {

            var self = this;
            this.message = "Hello World";


            self.friendsClicked = function friendsClicked() {
                self.message = "Friends clicked";
                this.users = [];
            };

            self.allusersClicked = function allusersClicked() {
                self.message = "All Users clicked";
                this.users = [];

                $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
                    console.log(response);
                    self.users = response.data;
                    console.log(self.users[0].fname);
                    console.log(self.users[0].sname);
                });
            }

            self.forumsClicked = function forumsClicked() {
                self.message = "Forums clicked";
                this.users = [];
            };

            self.blogsClicked = function blogsClicked() {
                self.message = "Blogs clicked";
                this.users = [];
            };

        }




    });