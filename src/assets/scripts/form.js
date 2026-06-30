// Selecciona el formulario del documento. 
// Asegúrate de que tu etiqueta <form> tenga el atributo id="contact-form"
const form = document.getElementById('contact-form');

async function handleSubmit(event) {
  // 1. Previene el comportamiento por defecto del formulario (que es recargar la página)
  event.preventDefault();

  // 2. Crea un objeto FormData a partir del evento de envío, que contiene los datos del formulario.
  const formData = new FormData(event.target);
  
  try {
    // 3. Usa fetch para enviar una solicitud POST al endpoint de Formspree
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        // Es importante este header para que Formspree devuelva una respuesta en formato JSON
        'Accept': 'application/json'
      }
    });

    // 4. Maneja la respuesta del servidor
    if (response.ok) {
      // Si el envío fue exitoso, muestra un mensaje y resetea el formulario
      alert('¡Gracias por tu mensaje! Ha sido enviado correctamente.');
      form.reset();
    } else {
      // Si hubo un error, intenta obtener los detalles del error de la respuesta
      const responseData = await response.json();
      if (Object.hasOwn(responseData, 'errors')) {
        // Muestra los errores específicos devueltos por Formspree
        alert(responseData['errors'].map(error => error['message']).join(', '));
      } else {
        // Muestra un mensaje de error genérico
        alert('Hubo un problema al enviar tu formulario.');
      }
    }
  } catch (error) {
    // 5. Captura cualquier error de red (ej. sin conexión a internet)
    console.error('Error:', error);
    alert('Hubo un error al enviar el formulario. Por favor, revisa tu conexión a internet.');
  }
}

// 6. Agrega un "escuchador de eventos" al formulario para que ejecute la función handleSubmit cuando se envíe.
form.addEventListener('submit', handleSubmit);