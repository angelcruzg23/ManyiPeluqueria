document.getElementById('ownerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch('/owners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) throw new Error('Error al registrar dueño');

    const data = await response.json();
    document.getElementById('message').innerText = `✅ Dueño registrado: ${data.name}`;
    document.getElementById('ownerForm').reset();
  } catch (error) {
    document.getElementById('message').innerText = '❌ Hubo un error: ' + error.message;
  }
});
