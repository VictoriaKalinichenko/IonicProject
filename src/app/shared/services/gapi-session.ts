import { Injectable } from "@angular/core";

@Injectable()
export class GapiSession {
    apiKey: string = "AIzaSyBHAtNEG2JHgOTlVl2N7jhZiZuvfh71PcM";
    clientId: string = "265255600993-707ns6l6sgd19rgh2cebnkh1q0sdunqu.apps.googleusercontent.com";
    scopes: "https://www.googleapis.com/auth/drive";
    googleAuth: any;

    initClient(): Promise<any> {
        return new Promise((resolve,reject) => {
            // gapi.load('auth2', function() {});

            // var auth2 = gapi.auth2.init({
            //     client_id: this.clientId,
            //     fetch_basic_profile: true,
            //     scope: this.scopes
            // });

            // auth2.signIn()
            //     .then(function() { 
            //         console.log(auth2.currentUser.get().getId());      
            //         resolve();  
            //      })
            //     .catch(function(err) { 
            //         console.log(err);
            //      });

            // gapi.load('auth2', function() {
            //     gapi.auth2.init({
            //         client_id: this.clientId,
            //         scope: this.scopes
            //     });          
            // });
            //     var auth2 = gapi.auth2.getAuthInstance();      
            //     auth2.signIn()
            //     .then(function() {
            //         console.log(auth2.currentUser.get().getId());      
            //         resolve();         
            //     })
            //     .catch((error) => console.log(error));  
            
        });
    }
}