'use strict'

//Register 'userhome' component along with its associated controller and template
angular.
    module('userHome').
    component('userHome', {
        templateUrl: 'user-home/user-home.template.html',
        controller: function UserHomeController($http, AuthenticationService) {

            var self = this;

            self.currentuser = new Object();

            self.currentuser = AuthenticationService.loadUserFromCookie();
            this.message = "Hello World from User Home";

            console.log(self.message);
            console.log(self.currentuser.role);


            self.friendsClicked = function friendsClicked() {
                self.message = "Friends clicked";

                this.users = [];
                self.menuoption = 1; //friends

                self.currentuser = new Object();
                self.currentuser.email = "";

                self.currentuser = AuthenticationService.loadUserFromCookie();
                window.location = "/#!/friends";
            };

            self.allusersClicked = function allusersClicked() {
                self.message = "Friends clicked";

                this.users = [];
                self.menuoption = 2; // allusers

                self.currentuser = new Object();
                self.currentuser.email = "";

                self.currentuser = AuthenticationService.loadUserFromCookie();
                window.location = "/#!/allusers";
            };

            self.permissionsClicked = function permissionsClicked() {
                self.message = "Login Permissions clicked";

                this.users = [];
                self.menuoption = 3; // Login Permissions

                window.location = "/#!/userauth";
            };

            self.blogsClicked = function blogsClicked() {
                self.message = "Blogs clicked";

                this.users = [];
                self.menuoption = 4; // blogs

                window.location = "/#!/userblog";
            };

        }


    });            