// Cargar dueños al iniciar
window.onload = async () => {
  const ownerSelect = document.getElementById('ownerId');

  try {
    const response = await fetch('/owners');
    const owners = await response.json();

    owners.forEach(owner => {
      const option = document.createElement('option');
      option.value = owner.id;
      option.textContent = `${owner.name} (${owner.phone})`;
      ownerSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando dueños:', error);
  }
};

document.getElementById('petForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const breed = document.getElementById('breed').value;
  const age = parseInt(document.getElementById('age').value);
  const ownerId = parseInt(document.getElementById('ownerId').value);

  try {
    const response = await fetch('/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, breed, age, ownerId }),
    });

    if (!response.ok) throw new Error('Error al registrar mascota');

    const data = await response.json();
    document.getElementById('message').innerText = `✅ Mascota registrada: ${data.name}`;
    document.getElementById('petForm').reset();
  } catch (error) {
    document.getElementById('message').innerText = '❌ Hubo un error: ' + error.message;
  }
});
