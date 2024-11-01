const btn = document.getElementById('button');
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_t12745b';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      alert('Enviado!');
      resetForm(); // Llama a la función para limpiar el formulario
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});

function resetForm() {
  form.reset(); // Restablece los valores del formulario
}