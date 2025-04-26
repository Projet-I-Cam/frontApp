import { Component, Renderer2, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions,EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrl: './events.component.scss',
    standalone: false
})
export class EventsComponent {
  public base = '';
  public page = '';
  public last = '';
  public routes = routes;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  addtime2: Date | undefined;
  showAddEventModal = false;
  showEventDetailsModal = false;
  eventDetails = { title: '' };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'title',
      center: 'dayGridMonth,dayGridWeek,dayGridDay',
      end: 'custombtn'
    },
    customButtons: {
      custombtn: {
        text: 'Add New Event',
        click: this.handleDateClick.bind(this)
      }
    },
    events: [
      {
        title: 'Summer Vacation',
        backgroundColor: '#FDE9ED',
        start: new Date(Date.now() - 168000000).toISOString().slice(0, 10)
      },
      {
        title: 'Parents, Teacher Meet',
        backgroundColor: '#E7F1FC',
        start: new Date(Date.now() + 338000000).toISOString().slice(0, 10)
      },
      {
        title: 'Admission Camp',
        backgroundColor: '#E6F9FF',
        start: new Date(Date.now() - 338000000).toISOString().slice(0, 10)
      },
      {
        title: 'Activity - Training',
        backgroundColor: '#E8F9E8',
        start: new Date(Date.now() + 68000000).toISOString().slice(0, 10)
      }
    ],
    eventClick: this.handleEventClick.bind(this)
  };

  handleDateClick() {
    this.showAddEventModal = true;
  }

  handleEventClick(info: EventClickArg) {
    this.eventDetails = {
      title: info.event.title
    };
    this.showEventDetailsModal = true;
  }

  handleAddEventClose() {
    this.showAddEventModal = false;
  }

  handleEventDetailsClose() {
    this.showEventDetailsModal = false;
  }

 
}
