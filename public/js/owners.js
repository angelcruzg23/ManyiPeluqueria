document.getElementById('addPet').addEventListener('click', () => {
  const container = document.getElementById('pets-container');
  const group = document.createElement('div');
  group.className = 'pet-group';
  group.innerHTML = `
    <input type="text" name="petName" placeholder="Nombre mascota" required>
    <input type="text" name="petBreed" placeholder="Raza" required>
    <input type="number" name="petAge" placeholder="Edad" required>
  `;
  container.appendChild(group);
});

document.getElementById('ownerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  const petGroups = document.querySelectorAll('.pet-group');
  const pets = Array.from(petGroups).map(group => {
    const [name, breed, age] = group.querySelectorAll('input');
    return {
      name: name.value,
      breed: breed.value,
      age: parseInt(age.value)
    };
  });

  try {
    const response = await fetch('/owners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, pets }),
    });

    if (!response.ok) throw new Error('Error al registrar dueño');

    const data = await response.json();
    document.getElementById('message').innerText = `✅ Dueño registrado con ${data.pets.length} mascota(s)`;
    document.getElementById('ownerForm').reset();
    document.getElementById('pets-container').innerHTML = `
      <h3>Mascotas:</h3>
      <div class="pet-group">
        <input type="text" name="petName" placeholder="Nombre mascota" required>
        <input type="text" name="petBreed" placeholder="Raza" required>
        <input type="number" name="petAge" placeholder="Edad" required>
      </div>`;
  } catch (error) {
    document.getElementById('message').innerText = '❌ Hubo un error: ' + error.message;
  }
});
