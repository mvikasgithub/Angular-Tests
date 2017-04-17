'use strict'

//Register 'userhome' component along with its associated controller and template
angular.
    module('userHome').
    component('userHome', {
        templateUrl: 'user-home/user-home.template.html',
        controller: function UserHomeController($http, AuthenticationService) {

            var self = this;
            this.message = "Hello World from User Home";
            this.menuoption = 0;

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

        }


    });            