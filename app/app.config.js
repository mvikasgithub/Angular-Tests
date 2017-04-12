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
            when('/login', {
                template:'<login-user></login-user>',
                requireLogin: false,
                roles: ['GUEST']
            }).
            otherwise('/login');

    }
    ]);
