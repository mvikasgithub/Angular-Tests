var authenticate = angular.module('AuthenticationModule', ['ngCookies']);

authenticate.service('AuthenticationService', ['$http', '$q', '$rootScope', '$cookies', 
    function ($http, $q, $rootScope, $cookies) {
        this.userIsAuthenticated = false;
        this.role = 'GUEST';

        // setter and getter
        this.setUserIsAuthenticated = function (value) {

            this.userIsAuthenticated = value;
        };

        this.getUserIsAuthenticated = function () {

            return this.userIsAuthenticated;
        };

        this.setRole = function (value) {

            this.role = value;
        };

        this.getRole = function () {

            return this.role;
        };



        //Method for user login
        this.login = function (user) {
            var deferred = $q.defer();
            $http.post('http://localhost:8080/onlinecollaboration/user/login', user).then(
                function (response) {
                    console.log('success');
                    deferred.resolve(response.data);
                    console.log(response.data);
                }, function (error) {
                    console.log("inside error in authenticate.module->login()");
                    //console.log(error);
                    //console.log(error.data.fname);


                    deferred.reject(error);

                }
            );
            return deferred.promise;
        }

        //saving user inside cookies
        this.saveUser = function (user) {
            $cookies.putObject('user', user);
            this.role = user.role;
            this.userIsAuthenticated = true;

        };


        //Loading user from cookies
        this.loadUserFromCookie = function () {
            user = $cookies.getObject('user');
            if (user) {
                this.userIsAuthenticated = true;
                this.role = user.role;
            } else {
                this.userIsAuthenticated = false;
                this.role = 'GUEST';
            }
            // returning the user from the cookie
            return user;
        };

        // Method for user logout
        // basically we are undefining the cookies set before
        this.logout = function (user) {

            var deferred = $q.defer();
            $http.post(REST_URI + '/logout', user).then(
                function (response) {
                    $cookies.putObject('user', undefined);
                    this.userIsAuthenticated = false;
                    this.role = 'GUEST';
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


    }]);