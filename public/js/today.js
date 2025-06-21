const container = document.getElementById('appointments-container');

const loadAppointments = async () => {
  container.innerHTML = '<p>Cargando citas...</p>';
  const res = await fetch('/appointments');
  const appointments = await res.json();

  const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

  /*const todayAppointments = appointments.filter(a => {
    return a.dateTime.startsWith(today);
  });*/
  const todayAppointments = appointments.filter(a => {
    const apptDate = new Date(a.dateTime);
    const now = new Date();

    return (
      apptDate.getDate() === now.getDate() &&
      apptDate.getMonth() === now.getMonth() &&
      apptDate.getFullYear() === now.getFullYear()
    );
  });


  if (todayAppointments.length === 0) {
    container.innerHTML = '<p>No hay citas programadas para hoy.</p>';
    return;
  }

  const list = document.createElement('div');
  todayAppointments.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>🐶 ${a.Pet?.name || 'Mascota'}</h3>
      <p><strong>Dueño:</strong> ${a.Pet?.Owner?.name || 'N/A'}</p>
      <p><strong>Hora:</strong> ${new Date(a.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Servicio:</strong> ${a.description}</p>
      <p><strong>Estado:</strong> <span class="estado">${a.status}</span></p>
      <div>
        <button onclick="updateStatus(${a.id}, 'in-progress')">🟡 En curso</button>
        <button onclick="updateStatus(${a.id}, 'completed')">✅ Completada</button>
        <button onclick="updateStatus(${a.id}, 'pending')">🔁 Pendiente</button>
      </div>
    `;
    list.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(list);
};

const updateStatus = async (id, newStatus) => {
  await fetch(`/appointments/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });

  await loadAppointments(); // recargar lista
};

setInterval(() => {
  loadAppointments(); // ya existente
}, 5000);


loadAppointments();
