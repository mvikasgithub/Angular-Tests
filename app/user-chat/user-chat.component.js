'use strict'

angular.
    module('userChat').
    component('userChat', {
        templateUrl: 'user-chat/user-chat.template.html',
        controller: function UserChatController($http, $route, AuthenticationService, DatashareService) {
            var self = this;
            self.chatWindowTxt = "";

            console.log("Inside UserChatController");

            self.currentuser = new Object();
            self.currentuser = AuthenticationService.loadUserFromCookie();

            self.chatTargetUser = new Object();
            self.chatTargetUser = DatashareService.loadChatUserFromCookie();
            console.log(self.chatTargetUser);

            self.chat = new Object();
            self.chat.senderuserid = self.currentuser.userid;
            self.chat.senderfname = self.currentuser.fname;
            self.chat.sendersname = self.currentuser.sname;
            self.chat.receiveruserid = self.chatTargetUser.userid;
            self.chat.receiverfname = self.chatTargetUser.fname;
            self.chat.receiversname = self.chatTargetUser.sname;

            $http.post('http://localhost:8080/onlinecollaboration/chat/receive', self.chat).then(
                function (response) {

                    console.log("inside UserChatController response part");
                    console.log(response);
                    self.chat = response.data;
                    console.log(self.chat);

                }, function (error) {

                    console.log("inside UserChatController reject part");
                    deferred.reject(error);

                });


            self.homeClicked = function homeClicked() {
                window.location = "/#!/home";
            };

            self.sendChatClicked = function sendChatClicked() {
                console.log(self.chatWindowTxt);

                self.chat.senderuserid = self.currentuser.userid;
                self.chat.senderfname = self.currentuser.fname;
                self.chat.sendersname = self.currentuser.sname;
                self.chat.receiveruserid = self.chatTargetUser.userid;
                self.chat.receiverfname = self.chatTargetUser.fname;
                self.chat.receiversname = self.chatTargetUser.sname;
                self.chat.chatData = self.chatWindowTxt;

                $http.post('http://localhost:8080/onlinecollaboration/chat/send', self.chat).then(
                    function (response) {

                        console.log("inside sendChatClicked response part");
                        console.log(response);
                        console.log(self.chat);

                    }, function (error) {

                        console.log("inside sendChatClicked reject part");
                        deferred.reject(error);

                    });

                    self.chatWindowTxt = "";
                    $route.reload();

            };
        }
    });