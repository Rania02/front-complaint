import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MbscModule } from '@mobiscroll/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalenderComponent } from './calender/calender.component';
import { LoginComponent } from './login/login.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderfullComponent } from './calenderfull/calenderfull.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FcalenderComponent } from './fcalender/fcalender.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    LoginComponent,
    CalenderfullComponent,
    FcalenderComponent,
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MbscModule,
    HttpClientJsonpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
