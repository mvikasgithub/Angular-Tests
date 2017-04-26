angular.
    module('userBlog').
    component('userBlog', {
        templateUrl: 'user-blog/user-blog.template.html',
        controller: function UserBlogController($http, $q, $window, $rootScope, $location, $route, AuthenticationService) {
            var self = this;

            self.currentuser = new Object();
            self.userblog = new Object();
            self.blogtitle = "";
            self.blogbody = "";

            //for "seek permission" we need to store the blogid, blogownerid
            self.activeblogid = "";
            self.activeblog_ownerid = "";

            // variable to seek permission for viewing the blog
            self.blogSeekPermission = "false";

            // variable to control display of the body of the blog
            self.displayblog = "false";

            self.currentuser = AuthenticationService.loadUserFromCookie();
            // $http.get('http://localhost:8080/onlinecollaboration/user/all').then(function (response) {
            $http.post('http://localhost:8080/onlinecollaboration/blog/all').then(function (response) {
                console.log(response);
                self.blogs = response.data;
                //console.log(self.blogs[0].title);
                //console.log(self.blogs[0].fullblog);

                console.log("self.currentuser = ");
                console.log(self.currentuser);
                console.log(self.currentuser.email);
            }, function (error) {
                console.log("inside error in UserBlogController");
                //console.log(error);
                //console.log(error.data.fname);

                deferred.reject(error);

            });

            self.homeClicked = function homeClicked() {
                window.location = "/#!/home";
            };

            self.blogDismissClicked = function blogDismissClicked() {
                self.displayblog = "false";
                self.blogbody = "";
            };

            self.blogViewClicked = function blogViewClicked(blog) {

                console.log("Inside blogViewClicked");

                var deferred = $q.defer();


                self.currentuser = AuthenticationService.loadUserFromCookie();

                console.log("blog.userid: " + blog.userid);
                console.log("currentuser.userid: " + self.currentuser.userid);

                // if the currentuser is the author of the blog then we do not have to hit the databaes
                // to check permission. Can directly display the body of the blog.
                if (blog.userid === self.currentuser.userid) {
                    self.displayblog = "true";
                    self.blogbody = blog.fullblog;
                    self.blogSeekPermission = "false";
                    window.scrollTo(0, document.body.scrollHeight);
                }
                else {
                    self.blogPermission = new Object();
                    self.blogPermission.blogpermissionsid = 0;
                    self.blogPermission.blogid = blog.blogid;
                    self.blogPermission.ownerid = blog.userid;
                    self.blogPermission.requesterid = self.currentuser.userid;
                    self.blogPermission.permitted = false;

                    // this is needed for later "if"" user clicks on seek permission`
                    self.activeblogid = blog.blogid;
                    self.activeblog_ownerid = blog.userid;


                    $http.post('http://localhost:8080/onlinecollaboration/blogpermission/check', self.blogPermission).then(function (response) {
                        console.log('success');
                        deferred.resolve(response.data);
                        console.log(response.data);

                        self.displayblog = "true";
                        self.blogbody = blog.fullblog;
                        self.blogSeekPermission = "false";
                        window.scrollTo(0, document.body.scrollHeight);

                    }, function (error) {
                        console.log("inside error in blogViewClicked");
                        //console.log(error);
                        //console.log(error.data.fname);

                        self.displayblog = "true";
                        self.blogbody = "You are not permitted to view this blog";
                        window.scrollTo(0, document.body.scrollHeight);

                        self.blogSeekPermission = "true";

                    }

                    )
                } // end of else

                return deferred.promise;
            } // end of blogViewClicked

            self.blogSubmitClicked = function blogSubmitClicked() {

                console.log("Inside blogSubmitClicked");

                var deferred = $q.defer();
                var self = this;

                self.currentuser = AuthenticationService.loadUserFromCookie();

                console.log(self.blogtitle);

                this.userblog.userid = self.currentuser.userid;
                this.userblog.authorfname = self.currentuser.fname;
                this.userblog.authorsname = self.currentuser.sname;
                this.userblog.title = self.blogtitle;
                this.userblog.fullblog = self.blogbody;

                console.log("Sending blog to BE to be written to database");

                $http.post('http://localhost:8080/onlinecollaboration/blog/add', self.userblog).then(
                    function (response) {
                        deferred.resolve(response.data);
                        console.log(response.data);
                        console.log("inside response");
                        this.message = response.data;
                    },
                    function (error) {
                        console.log("inside error");
                        console.log(error.data.responseCode);
                        console.log(error.data.responseMessage);

                        deferred.reject(error);
                    }
                );

                return deferred.promise;


            } // end of blogSubmitClicked


            self.blogSeekPermissionClicked = function blogSeekPermissionClicked() {

                console.log("Inside blogSeekPermissionClicked");
                this.message = "";

                var deferred = $q.defer();

                self.blogPermission = new Object();
                self.blogPermission.blogpermissionsid = 0;
                self.blogPermission.blogid = self.activeblogid;
                self.blogPermission.ownerid = self.activeblog_ownerid;
                self.blogPermission.requesterid = self.currentuser.userid;
                self.blogPermission.permitted = false;

                $http.post('http://localhost:8080/onlinecollaboration/blogpermission/request', self.blogPermission).then(function (response) {
                    console.log('success');
                    deferred.resolve(response.data);
                    console.log(response.data);

                    self.message = "Request for permission submitted";
                    $window.scrollTo(0, 0); // scroll to top to display the message

                }, function (error) {
                    console.log("inside error in blogViewClicked");
                    deferred.reject(error);
                    //console.log(error);

                    self.message = "Request for permission failed !! Try again";
                    $window.scrollTo(0, 0); // scroll to top to display the message

                } // end of function(error)

                ); // end of then

                self.blogDismissClicked(); // invoke status similar to blogDismissClicked
                
                return deferred.promise;

            } // end of blogSeekPermissionClicked

            self.blogPermissionsClicked = function blogPermissionsClicked(){
                window.location = "/#!/blogpermissions"

            }// end of blogPermissionsClicked

        } // end of UserBlogController
    }); // end of component