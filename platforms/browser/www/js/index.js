/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        //StatusBar.backgroundColorByHexString("#0052cc");
        StatusBar.hide();

        function onConfirm(buttonIndex){
            alert("Você selecionou o botão "+buttonIndex);
            if(buttonIndex == 1){
                location.reload();
            }
        }

        var path = window.location.pathname;
        var page = path.split("/").pop();
        alert(page);

        var push = PushNotification.init({ "android": {"senderID": "94293016035"}});

        sessionStorage.setItem('push', push);
        
         push.on('registration', function(data) {
            
            console.info("Registration Push: "+data.registrationId);
            //document.getElementById("gcm_id").innerHTML = data.registrationId;
            localStorage.setItem('gcm', data.registrationId);
        });


         push.on('notification', function(data) {
            //alert(data.title+" Message: " +data.message);
            if(page == 'index.html'){
                
            }else if(page == 'agenda.html'){
                navigator.notification.beep(2);
                navigator.vibrate(2000);
                navigator.notification.confirm(
                    data.message,
                    onConfirm,
                    data.title,
                    ['OK', 'Cancelar']
                 );
            }
         });

        push.on('error', function(e) {
            alert(e);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }

    
};

app.initialize();