const today = new Date();
const todayStr = today.toISOString().split('T')[0];

const citasHoyElem = document.getElementById('citasHoy');
const enCursoElem = document.getElementById('enCurso');
const completadasHoyElem = document.getElementById('completadasHoy');
const totalFacturadoElem = document.getElementById('totalFacturado');
const citasProximasElem = document.getElementById('citasProximas');

async function cargarDashboard() {
  const res = await fetch('/appointments');
  const appointments = await res.json();

  appointments.forEach(a => {
  
});

  let citasHoy = 0, enCurso = 0, completadasHoy = 0, totalFacturado = 0, proximas = 0;

  appointments.forEach(a => {
    const apptDate = new Date(a.dateTime);
    const apptDateStr = apptDate.toISOString().split('T')[0];

    //const diffDays = Math.floor((apptDate - today) / (1000 * 60 * 60 * 24));
    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((apptDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / oneDay);

    console.log(`Cita hoy: ${a.id} - Estado: ${a.status} - Fecha: ${apptDateStr} - Diferencia: ${diffDays} días`);

    // Citas de hoy
    if (apptDateStr === todayStr) {
      
      citasHoy++;
      if (a.status.toLowerCase() === 'in-progress') enCurso++;
      if (a.status.toLowerCase() === 'completed') {
        completadasHoy++;
        if (Array.isArray(a.Services)) {
          a.Services.forEach(s => {
            totalFacturado += parseFloat(s.price || 0);
          });
        }
      }
    }

    // Próximas citas (días siguientes)
    if (diffDays > 0 && diffDays <= 3) {
      proximas++;
    }
  });

  citasHoyElem.textContent = citasHoy;
  enCursoElem.textContent = enCurso;
  completadasHoyElem.textContent = completadasHoy;
  totalFacturadoElem.textContent = `$${totalFacturado.toFixed(2)}`;
  citasProximasElem.textContent = proximas;
}

setInterval(() => {
  cargarDashboard(); // ya existente
}, 5000);

cargarDashboard();
