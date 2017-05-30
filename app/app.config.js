var ellianzFE =  angular.
    module('ellianzFE').
    config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider.
                when('/message', {
                    template: '<basic-connection></basic-connection>',
                    requiresLogin: true,
                }).
                when('/greeting', {
                    template: '<greeting-test></greeting-test>',
                    requiresLogin: true,
                }).
                when('/register', {
                    template: '<register-user></register-user>',
                    requireLogin: true,
                    roles: ['GUEST']
                }).
                when('/home', {
                    template: '<user-home></user-home>',
                    requireLogin: true,
                }).
                when('/friends', {
                    template: '<my-friends></my-friends>',
                    requireLogin: true,
                }).
                when('/allusers', {
                    template: '<all-users></all-users>',
                    requireLogin: true,
                }).
                when('/userauth', {
                    template: '<user-auth></user-auth>',
                    requireLogin: true,
                }).
                when('/userblog', {
                    template: '<user-blog></user-blog>',
                    requireLogin: true,
                }).
                when('/userchat', {
                    template: '<user-chat></user-chat>',
                    requireLogin: true,
                }).
                when('/blogpermissions', {
                    template: '<blog-permissions></blog-permissions>',
                    requireLogin: true,
                }).
                when('/login', {
                    template: '<login-user></login-user>',
                    requireLogin: false,
                }).
                otherwise('/login');

        }
    ]);

/**
 * Loading all the routes here
 */
/*

ellianzFE.config(['$routeProvider', '$locationProvider', '$httpProvider',function($routeProvider,$locationProvider,$httpProvider){

    // allows the cookie with session id to be sent back
    $httpProvider.defaults.withCredentials = true;

    // fill up the path in the $routeProvider the objects created before
    for(var path in window.routes) {
        $routeProvider.when(path,window.routes[path]);
    }

    $routeProvider.otherwise({redirectTo: '/login'});

}]);

// When the app runs check whether the user navigating through the website is
// authenticated and authorized to view the exisiting page
ellianzFE.run(function($rootScope,$location,AuthenticationService) {


    $rootScope.$on('$locationChangeStart', function(event, next, current) {    
        // iterate through all the routes
        for(var i in window.routes) {
            // if routes is present make sure the user is authenticated 
            // before login using the authentication service            
            if(next.indexOf(i)!=-1) {                
                // if trying to access page which requires login and is not logged in                                                 
                $rootScope.user = AuthenticationService.loadUserFromCookie();
                $rootScope.authenticated = AuthenticationService.getUserIsAuthenticated();
                
                if(window.routes[i].requireLogin && !AuthenticationService.getUserIsAuthenticated()) {                                   
                    $location.path('/login');
                }
                else if((AuthenticationService.getUserIsAuthenticated()) 
                        &&
                        (window.routes[i].roles.indexOf(AuthenticationService.getRole())==-1)) {
                        $location.path('/error');
                }                
            }
        }        
    });


    $rootScope.logout = function() {
        // call the logout  function created in AuthenticationService
        AuthenticationService.logout()
        .then(
            // function callback
            function(message) {
                $rootScope.message = message;
                $location.path('/login');
            }
        );

    };

});
 
*/

