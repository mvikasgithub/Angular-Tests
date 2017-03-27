angular.
    module('ellianzFE').
    config(['$routeProvider',
        function config($routeProvider){

            $routeProvider.
            when('/message', {
                template: '<basic-connection></basic-connection>'
            }).
            when('/greeting',{
                template: '<greeting-test></greeting-test>'
            }).            
            when('/register', {
                template: '<register-user></register-user>'
            }).
            otherwise('/message');

    }
    ]);
