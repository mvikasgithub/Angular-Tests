'use strict'

angular.
    module('blogPermissions').
    component('blogPermissions', {
        templateUrl: 'blog-permissions/blog-permissions.template.html',
        controller: function BlogPermissionsController($http, $q, AuthenticationService) {

            this.users = [];

            var self = this;


            self.currentuser = new Object();
            self.currentuser = AuthenticationService.loadUserFromCookie();

            $http.post('http://localhost:8080/onlinecollaboration/blogpermission/awaiting', self.currentuser.userid).then(function (response) {
                console.log(response);
                self.users = response.data;
                console.log(self.users[0].fname);
                console.log(self.users[0].phoneno);

            }, function (error) {
                console.log("inside error in BlogPermissionsController");

            });

 
    
            self.homeClicked = function homeClicked() {
                console.log("Home clicked");
                window.location = "/#!/home";
            };
        }


    });