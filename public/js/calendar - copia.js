/* global FullCalendar */

document.addEventListener('DOMContentLoaded', async function () {
  const calendarEl = document.getElementById('calendar');

  const res = await fetch('/appointments');
  const appointments = await res.json();


  const events = appointments.map(a => {
    return {
      id: a.id,
      title: `${a.Pet?.name || 'Mascota'} - ${a.description}`,
      start: a.dateTime,
      color: getColor(a.status),
      extendedProps: {
        owner: a.Pet?.Owner?.name || 'Dueño desconocido',
        services: a.Services?.map(s => s.name) || []
      }
    };
  });

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: "auto",
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: events,
    eventClick: function (info) {
      const event = info.event;
      alert(`🐶 Mascota: ${event.title}
👤 Dueño: ${event.extendedProps.owner}
📅 Fecha: ${event.start.toLocaleString()}
🧼 Servicios: ${event.extendedProps.services.join(', ')}`);
    }
    /*eventClick: function (info) {
      const event = info.event;
      alert(`🐶 Mascota: ${event.title}
👤 Dueño: ${event.extendedProps.owner}
📅 Fecha: ${event.start.toLocaleString()}
🧼 Servicios: ${event.extendedProps.services.join(', ')}`);
    }*/
  });

  calendar.render();
});

function getColor(status) {
  switch (status) {
    case 'pending': return '#f8d7da';      // rojo claro
    case 'in-progress': return '#fff3cd';  // amarillo claro
    case 'completed': return '#d4edda';    // verde claro
    default: return '#d1ecf1';             // azul claro (sin estado)
  }
}
