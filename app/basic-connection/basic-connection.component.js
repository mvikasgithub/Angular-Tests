'use strict'

//Register 'basicConnection' component along with its associated controller and template
angular.
    module('basicConnection').
    component('basicConnection', {
        templateUrl: 'basic-connection/basic-connection.template.html',
        controller: function BasicConnectionController($http, AuthenticationService) {

            var self = this;
            this.message = "Hello World";
            this.menuoption = 0;


            self.friendsClicked = function friendsClicked() {
                self.message = "Friends clicked";

                this.users = [];
                self.menuoption = 1;

                self.currentuser = new Object();
                self.currentuser.email = "";

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
            };

            self.allusersClicked = function allusersClicked() {
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
            };

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