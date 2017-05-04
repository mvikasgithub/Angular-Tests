'use strict'

angular.
    module('blogPermissions').
    component('blogPermissions', {
        templateUrl: 'blog-permissions/blog-permissions.template.html',
        controller: function BlogPermissionsController($http, $q, $route, AuthenticationService) {

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

            self.grantPermissionClicked = function grantPermissionClicked(user) {
                console.log("Grant Permission Clicked");

                self.blogPermission = new Object();
                self.blogPermission.blogpermissionsid = user.Address;
                self.blogPermission.blogid = user.phoneno;
                self.blogPermission.ownerid = self.currentuser.userid;
                self.blogPermission.requesterid = user.userid;
                self.blogPermission.permitted = true;

                $http.post('http://localhost:8080/onlinecollaboration/blogpermission/grant', self.blogPermission).then(function (response) {
                    console.log('success in grantPermissionClicked');
                    console.log(response.data);
                    $route.reload();

                }, function (error) {
                    console.log("inside error in grantPermissionClicked");
                    //console.log(error);
                    //console.log(error.data.fname);
 
                }

                )
            } // end of grantPermissionClicked

            self.rejectPermissionClicked = function rejectPermissionClicked(user) {
                console.log("Reject Permission Clicked");

                self.blogPermission = new Object();
                self.blogPermission.blogpermissionsid = user.Address;
                self.blogPermission.blogid = user.phoneno;
                self.blogPermission.ownerid = self.currentuser.userid;
                self.blogPermission.requesterid = user.userid;
                self.blogPermission.permitted = false;

                $http.post('http://localhost:8080/onlinecollaboration/blogpermission/reject', self.blogPermission).then(function (response) {
                    console.log('success in rejectPermissionClicked');
                    console.log(response.data);
                    $route.reload();

                }, function (error) {
                    console.log("inside error in rejectPermissionClicked");
                    //console.log(error);
                    //console.log(error.data.fname);
 
                }

                )
            }// end of rejectPermissionClicked

        } // end of BlogPermissionsController


    });