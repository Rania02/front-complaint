import { Component, OnInit, ViewChild } from '@angular/core';
import {
  formatDate,
    MbscCalendarEvent,
    MbscDatepickerOptions,
    MbscEventcalendarOptions,
    MbscPopup,
    MbscPopupOptions,
    Notifications,
    setOptions
    , localeFr
} from '@mobiscroll/angular';
setOptions({
  locale: localeFr,
  theme: 'ios',
  themeVariant: 'light'
});
const days = [{
  name: 'Sun',
  value: 'SU',
  checked: true
}, {
  name: 'Mon',
  value: 'MO'
}, {
  name: 'Tue',
  value: 'TU'
}, {
  name: 'Wed',
  value: 'WE'
}, {
  name: 'Thu',
  value: 'TH'
}, {
  name: 'Fri',
  value: 'FR'
}, {
  name: 'Sat',
  value: 'SA'
}];
@Component({
  selector: 'app-fcalender',
  templateUrl: './fcalender.component.html',
  styleUrls: ['./fcalender.component.css']
})
export class FcalenderComponent  implements OnInit{

  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  popupEventTitle: string | undefined;
  popupEventDescription = '';
  popupEventAllDay = true;
  popupEventDates: any;
  popupEventStatus = 'busy';
  calendarSelectedDate: any = new Date();
  switchLabel: any = 'All-day';
    myEvents: MbscCalendarEvent[] = [{
        id: 1,
        start: '2022-05-08T13:00',
        end: '2022-05-08T13:30',
        title: 'Lunch @ Butcher\'s',
        description: '',
        allDay: false,
        status: 'free',
        color: '#26c57d'
    }, {
        id: 2,
        start: '2022-05-09T15:00',
        end: '2022-05-09T16:00',
        title: 'General orientation',
        description: '',
        allDay: false,
        status: 'busy',
        color: '#fd966a'
    }, {
        id: 3,
        start: '2022-05-08T18:00',
        end: '2022-05-08T22:00',
        title: 'Dexter BD',
        description: '',
        allDay: false,
        status: 'free',
        color: '#37bbe4'
    }, {
        id: 4,
        start: '2022-05-10T10:30',
        end: '2022-05-10T11:30',
        title: 'Stakeholder mtg.',
        description: '',
        allDay: false,
        status: 'busy',
        color: '#d00f0f'
    }];
  repeatData = [{
    value: 'norepeat',
    text: 'Does not repeat'
  }, {
    value: 'daily',
    text: 'Daily'
  }, {
    value: 'weekly',
    text: 'Weekly'
  }, {
    value: 'monthly',
    text: 'Monthly'
  }, {
    value: 'yearly',
    text: 'Yearly'
  }, {
    value: 'weekday',
    text: 'Every weekday (Monday to Friday)'
  }, {
    value: 'custom',
    text: 'Custom'
  }];
  selectedRepeat = 'norepeat';
  selectResponsive = {
    xsmall: {
      touchUi: true
    },
    small: {
      touchUi: false
    }
  };
  weekDays = [...days];
  showCustomRepeat = false;
  repeatType = 'daily';
  repeatNr = 1;
  monthlyDays = ['1'];
  monthlyDay = 1;
  yearlyDays = ['1'];
  yearlyDay = 1;
  months = [{
    value: 1,
    text: 'January'
  }, {
    value: 2,
    text: 'February'
  }, {
    value: 3,
    text: 'March'
  }, {
    value: 4,
    text: 'April'
  }, {
    value: 5,
    text: 'May'
  }, {
    value: 6,
    text: 'June'
  }, {
    value: 7,
    text: 'July'
  }, {
    value: 8,
    text: 'August'
  }, {
    value: 9,
    text: 'September'
  }, {
    value: 10,
    text: 'October'
  }, {
    value: 11,
    text: 'November'
  }, {
    value: 12,
    text: 'December'
  }];
  selectedMonth = 1;
  untilDate: any;
  occurrences = 1;
  condition = 'never';
  tempEvent: any;
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      calendar: { type: 'month', labels: true }
    },
    onEventClick: (args) => {
      this.isEdit = true;
      this.tempEvent = args.event.original ? args.event.original : args.event;
      // fill popup form with event data
      this.loadPopupForm(args.event);

      // set popup options
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      // open the popup
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        // fill popup form with event data
        this.loadPopupForm(args.event);
        // set popup options
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        this.resetCustomValues();
        // open the popup
        this.popup.open();
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    },
    onEventUpdated: (args) => {
      // here you can update the event in your storage as well, after drag & drop or resize
      // ...
    }
  };
  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;
  popupAddButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',
    text: 'Add',
    cssClass: 'mbsc-popup-button-primary'
  }];
  popupEditButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',
    text: 'Save',
    cssClass: 'mbsc-popup-button-primary'
  }];
  popupButtons: any = [];
  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    scrollLock: false,
    height: 500,
    onClose: () => {
      this.repeatData = this.repeatData.filter(item => item.value !== 'custom-value');
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        this.myEvents = [...this.myEvents];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 510,
        fullScreen: false,
        touchUi: false
      }
    }
  };
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false
    }
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false
    }
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true
  };
  isEdit = false;
  loadPopupForm(event: MbscCalendarEvent): void {
    const startDate = new Date(event.start as any);
    this.popupEventTitle = event.title;
    this.popupEventDescription = event.description;
    this.popupEventDates = [startDate, event.end];
    this.untilDate = formatDate('YYYY-MM-DD', new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1));
    this.popupEventAllDay = event.allDay || false;
    this.popupEventStatus = event.status || 'busy';
    this.updateCustomForm();

  }
  saveEvent(): void {
    let recurringRule: any;
    const d = new Date(this.tempEvent.start);

    switch (this.selectedRepeat) {
      case 'daily':
        recurringRule = { repeat: 'daily' };
        break;
      case 'weekly':
        recurringRule = { repeat: 'weekly', weekDays: this.weekDays[d.getDay()].value };
        break;
      case 'monthly':
        recurringRule = { repeat: 'monthly', day: d.getDate() };
        break;
      case 'yearly':
        recurringRule = { repeat: 'yearly', month: d.getMonth() + 1 };
        break;
      case 'weekday':
        recurringRule = { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' };
        break;
      case 'custom':
      case 'custom-value':
        recurringRule = {
          repeat: this.repeatType,
          interval: this.repeatNr
        };

        switch (this.repeatType) {
          case 'weekly':
            recurringRule.weekDays = this.weekDays.filter(i => i.checked).map(i => i.value).join(',');
            break;
          case 'monthly':
            recurringRule.day = this.monthlyDay;
            break;
          case 'yearly':
            recurringRule.day = this.yearlyDay;
            recurringRule.month = this.selectedMonth;
            break;
        }

        switch (this.condition) {
          case 'until':
            recurringRule.until = this.untilDate;
            break;
          case 'count':
            recurringRule.count = this.occurrences;
            break;
        }
        break;
    }

    this.tempEvent.title = this.popupEventTitle;
    this.tempEvent.description = this.popupEventDescription;
    this.tempEvent.start = this.popupEventDates[0];
    this.tempEvent.end = this.popupEventDates[1];
    this.tempEvent.allDay = this.popupEventAllDay;
    this.tempEvent.status = this.popupEventStatus;
    this.tempEvent.recurring = recurringRule;

    if (this.isEdit) {
      // update the event in the list
      this.myEvents = [...this.myEvents];
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      this.myEvents = [...this.myEvents, this.tempEvent];
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar
    this.navigateTo();
    // close the popup
    this.popup.close();
  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.myEvents = this.myEvents.filter(item => item.id !== event.id);
  }
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
  }

  // set custom values to default
  resetCustomValues(): void {
    this.repeatType = 'daily';
    this.repeatNr = 1;
    this.condition = 'never';
    this.occurrences = 1;
    this.selectedMonth = 1;
    this.monthlyDay = 1;
    this.yearlyDay = 1;
    const newWeekDays = [...days];
    for (const day of newWeekDays) {
      day.checked = day.value === 'SU';
    }
    this.selectedRepeat = 'norepeat';
    this.showCustomRepeat = false;
    this.repeatData = this.repeatData.filter(item => item.value !== 'custom-value');
  }

  updateCustomForm(): void {
    const d = new Date(this.tempEvent.start);
    const weekday = d.getDay();
    const monthday = d.getDate();
    const newData = [...this.repeatData];

    // update select texts by selected date
    for (const item of newData) {
      switch (item.value) {
        case 'weekly':
          item.text = 'Weekly on ' + days[weekday].name;
          break;
        case 'monthly':
          item.text = 'Monthly on day ' + monthday;
          break;
        case 'yearly':
          item.text = 'Annually on ' + this.months[d.getMonth()].text + ' ' + monthday;
          break;
        default:
      }
    }

    this.repeatData = newData;

    const rec = this.tempEvent.recurring;

    if (rec) {
      this.repeatType = rec.repeat;
      if (rec.interval) {
        // set custom text
        let customText = '';

        this.repeatNr = rec.interval;

        switch (rec.repeat) {
          case 'daily':
            customText = this.repeatNr > 1 ? ('Every ' + this.repeatNr + ' days') : 'Daily';
            break;
          case 'weekly':
            const newWeekDays = [...days];
            const weekD = rec.weekDays.split(',');

            for (const day of newWeekDays) {
              day.checked = weekD.includes(day.value);
            }

            this.weekDays = newWeekDays;
            customText = this.repeatNr > 1 ? ('Every ' + this.repeatNr + ' weeks') : 'Weekly';
            customText += ' on ' + this.weekDays.filter(i => i.checked).map(i => i.name).join(', ');
            break;
          case 'monthly':
            this.monthlyDay = rec.day;
            customText = this.repeatNr > 1 ? ('Every ' + this.repeatNr + ' months') : 'Monthly';
            customText += ' on day ' + this.monthlyDay;
            break;
          case 'yearly':
            this.yearlyDay = rec.day;
            this.selectedMonth = rec.month;
            customText = this.repeatNr > 1 ? ('Every ' + this.repeatNr + ' years') : 'Annualy';
            customText += ' on ' + this.months[this.selectedMonth - 1].text + ' ' + this.yearlyDay;
            break;
        }

        if (rec.until) {
          this.condition = 'until';
          this.untilDate = rec.until;
          customText += ' until ' + formatDate('MMMM D, YYYY', new Date(this.untilDate));
        } else if (rec.count) {
          this.condition = 'count';
          this.occurrences = rec.count;
          customText += ', ' + this.occurrences + ' times';
        } else {
          this.condition = 'never';
        }

        // add custom value
        this.repeatData = [...this.repeatData, { value: 'custom-value', text: customText }];
        // set custom value
        this.selectedRepeat = 'custom-value';
      } else if (rec.weekDays === 'MO,TU,WE,TH,FR') {
        this.selectedRepeat = 'weekday';
      } else {
        this.selectedRepeat = rec.repeat;
      }
    } else {
      this.resetCustomValues();
    }
    this.showCustomRepeat = this.selectedRepeat === 'custom' || this.selectedRepeat === 'custom-value';
  }

  // popuplate data for months
  populateMonthDays(month: number, type: string): void {
    const day30 = [2, 4, 6, 9, 11];
    const newValues = [];

    for (let i = 1; i <= 31; i++) {
      if (!(i === 31 && day30.includes(month)) && !((i === 30) && month === 2)) {
        newValues.push(i.toString());
      }
    }

    if (type === 'monthly') {
      this.monthlyDays = newValues;
      this.monthlyDay = 1;
    } else {
      this.yearlyDays = newValues;
      this.yearlyDay = 1;
    }
  }

  monthChange(ev: any): void {
    this.selectedMonth = ev.value;
    this.yearlyDay = 1;
    this.populateMonthDays(ev.value, 'yearly');
  }

  navigateTo(): void {
    const rec = this.tempEvent.recurring;
    const d = new Date(this.tempEvent.start);
    let nextYear = 0;

    // navigate the calendar to the correct view
    if (rec && rec.repeat === 'yearly') {
      if (d.getMonth() + 1 > +rec.month && d.getDay() > +rec.day) {
        nextYear = 1;
      }
      this.calendarSelectedDate = new Date(d.getFullYear() + nextYear, rec.month - 1, rec.day);
    } else {
      this.calendarSelectedDate = d;
    }
  }

  ngOnInit(): void {
    this.populateMonthDays(1, 'monthly');
    this.populateMonthDays(1, 'yearly');
  }
}