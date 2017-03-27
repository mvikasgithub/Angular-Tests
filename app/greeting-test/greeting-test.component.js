'use strict'

angular.
    module('greetingTest').
    component('greetingTest', {
        templateUrl: 'greeting-test/greeting-test.template.html',
        controller: function GreetingTestController($http) {
            var self = this;

            $http.get('http://localhost:8080/onlinecollaboration/greeting').then(function (response) {
                console.log(response);
                self.message = response.data.responseMessage;
            });

        }
    });