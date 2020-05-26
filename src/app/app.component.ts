import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  isStatusBarLight = true

  constructor( private platform: Platform ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try{
      await SplashScreen.hide();
      await StatusBar.setStyle({
        style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
      });
      this.isStatusBarLight = !this.isStatusBarLight;
    }
    catch(err){
      console.log('This is normal in a browser', err);
    }
  }
}
