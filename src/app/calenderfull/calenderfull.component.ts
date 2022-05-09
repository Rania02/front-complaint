import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent , localeAr } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-calenderfull',
  templateUrl: './calenderfull.component.html',
  styleUrls: ['./calenderfull.component.sass']
})
export class CalenderfullComponent implements OnInit {

  constructor(private http: HttpClient, private notify: Notifications) {}

    myEvents: MbscCalendarEvent[] = [];

    eventSettings: MbscEventcalendarOptions = {
        locale: localeAr,
        theme: 'ios',
        themeVariant: 'light',
        clickToCreate: false,
        dragToCreate: false,
        dragToMove: false,
        dragToResize: false,
        view: {
            calendar: { labels: true }
        },
        onEventClick: (event, inst) => {
            this.notify.toast({
                message: event.event.title
            });
        }
    };

    ngOnInit(): void {
        this.http.jsonp < MbscCalendarEvent[] > ('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
            this.myEvents = resp;
        });
    }

}
