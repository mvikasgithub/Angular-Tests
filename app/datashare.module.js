var datashare = angular.module('DatashareModule', ['ngCookies']);

datashare.service('DatashareService', ['$cookies',
    function ($cookies) {
        this.user = new Object();

        // setter and getter
        this.setUser = function (value) {

            this.user = value;
        };

        this.getUser = function () {

            return this.user;
        };

        //saving user inside cookies
        this.saveChatUser = function (user) {
            console.log("Inside saveChatUser");
            console.log(user);
            $cookies.putObject('chatUser', user);
        };

        //Loading user from cookies
        this.loadChatUserFromCookie = function () {
            user = $cookies.getObject('chatUser');

            console.log("Inside loadChatUserFromCookie");
            console.log(user);

            // returning the user from the cookie
            return user;
        };
    }]);