/* global FullCalendar */

document.addEventListener('DOMContentLoaded', async function () {
  const calendarEl = document.getElementById('calendar');
  const statusFilter = document.getElementById('statusFilter');

  const res = await fetch('/appointments');
  const appointments = await res.json();

  const formatEvents = (status = 'all') => {
    return appointments
      .filter(a => status === 'all' || a.status === status)
      .map(a => ({
        id: a.id,
        title: `${a.Pet?.name || 'Mascota'} - ${a.description}`,
        start: a.dateTime,
        color: getColor(a.status),
        extendedProps: {
          owner: a.Pet?.Owner?.name || 'Dueño desconocido',
          services: a.Services?.map(s => s.name) || []
        }
      }));
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: formatEvents(),
    eventClick: function (info) {
      const eventId = info.event.id;
      window.open(`/receipts/${eventId}`, '_blank');
    }
  });

  calendar.render();

  // Actualizar eventos según filtro
  statusFilter.addEventListener('change', () => {
    const selected = statusFilter.value;
    calendar.removeAllEvents();
    calendar.addEventSource(formatEvents(selected));
  });
});

function getColor(status) {
  switch (status) {
    case 'pending': return '#f8d7da';
    case 'in-progress': return '#fff3cd';
    case 'completed': return '#d4edda';
    default: return '#d1ecf1';
  }
}
