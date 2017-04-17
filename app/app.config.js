angular.
    module('ellianzFE').
    config(['$routeProvider',
        function config($routeProvider){

            $routeProvider.
            when('/message', {
                template: '<basic-connection></basic-connection>',
                roles:['student', 'staff']
            }).
            when('/greeting',{
                template: '<greeting-test></greeting-test>'
            }).            
            when('/register', {
                template: '<register-user></register-user>',
                requireLogin: false,
                roles: ['GUEST']
            }).
            when('/home', {
                template: '<user-home></user-home>',
            }).
           when('/friends', {
                template: '<my-friends></my-friends>',
            }).            
           when('/allusers', {
                template: '<all-users></all-users>',
            }).            
            when('/login', {
                template:'<login-user></login-user>',
                requireLogin: false,
                roles: ['GUEST']
            }).
            otherwise('/login');

    }
    ]);
