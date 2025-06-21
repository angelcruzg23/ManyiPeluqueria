document.getElementById('serviceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);

  try {
    const response = await fetch('/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price }),
    });

    if (!response.ok) throw new Error('Error al registrar servicio');

    const data = await response.json();
    document.getElementById('message').innerText = `✅ Servicio registrado: ${data.name}`;
    document.getElementById('serviceForm').reset();
  } catch (error) {
    document.getElementById('message').innerText = '❌ Error: ' + error.message;
  }
});
