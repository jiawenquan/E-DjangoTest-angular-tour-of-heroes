import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component'; // 添加到组件
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  // 声明的组件集
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  // 导入的驱动模块
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
