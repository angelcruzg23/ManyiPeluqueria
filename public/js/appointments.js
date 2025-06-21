window.onload = async () => {
  await loadPets();
  await loadServices();
};

const loadPets = async () => {
  const petSelect = document.getElementById('petId');
  const response = await fetch('/pets');
  const pets = await response.json();

  pets.forEach(pet => {
    const option = document.createElement('option');
    option.value = pet.id;
    option.textContent = `${pet.name} (${pet.Owner?.name || 'Sin dueño'})`;
    petSelect.appendChild(option);
  });
};

const loadServices = async () => {
  const serviceList = document.getElementById('serviceList');
  const response = await fetch('/services');
  const services = await response.json();

  services.forEach(service => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>
        <input type="checkbox" name="services" value="${service.id}" />
        ${service.name} ($${parseFloat(service.price).toFixed(2)})
      </label>
    `;
    serviceList.appendChild(div);
  });
};

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const petId = parseInt(document.getElementById('petId').value);
  //const dateTime = document.getElementById('dateTime').value;
  const localDate = new Date(document.getElementById('dateTime').value);
  const dateTime = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString();

  const description = document.getElementById('description').value;

  const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked');
  const serviceIds = Array.from(serviceCheckboxes).map(cb => parseInt(cb.value));

  try {
    const response = await fetch('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ petId, dateTime, description, serviceIds }),
    });

    if (!response.ok) throw new Error('Error al agendar la cita');

    document.getElementById('message').innerText = '✅ Cita agendada con servicios';
    document.getElementById('appointmentForm').reset();
  } catch (error) {
    document.getElementById('message').innerText = '❌ Error: ' + error.message;
  }
});
