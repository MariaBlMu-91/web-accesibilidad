console.log("JS cargado");

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(question => {
    question.addEventListener("click", () => {

      const isOpen = question.getAttribute("aria-expanded") === "true";

      // cerrar todos
      questions.forEach(q => q.setAttribute("aria-expanded", "false"));

      // abrir solo si estaba cerrado
      if (!isOpen) {
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});


document.getElementById("btnEnviar").addEventListener("click", function (e) {
  e.preventDefault();

  const errores = [];
  const resumenErrores = document.getElementById("resumenErrores");

  resumenErrores.innerHTML = "";
  resumenErrores.style.display = "none";

  // Referencias
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const errorBox = document.getElementById("form-errors");

  // 🔹 LIMPIAR ERRORES ANTERIORES
  document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
  document.querySelectorAll("input, textarea").forEach(el => {
    el.classList.remove("input-error");
  });

  // 🔹 (Dejo tu forma de añadir errores tal cual)
  if (!name.value.trim()) {
    errores.push({ campo: "name", mensaje: "Por favor, escriba su nombre." });
  }

  if (!email.value.trim()) {
    errores.push({ campo: "email", mensaje: "Por favor, escriba su correo." });
  }

  if (!message.value.trim()) {
    errores.push({ campo: "message", mensaje: "Por favor, escriba el mensaje." });
  }

  // 🔴 Si hay errores
  if (errores.length > 0) {

    let h4 = document.createElement('h4');
    h4.id = 'encabezado_errores';
    h4.innerHTML = `Hay ${errores.length} errores en el formulario`;
    resumenErrores.appendChild(h4);

    let ol = document.createElement('ol');

    errores.forEach(error => {

      // 🔹 TU RESUMEN CON ENLACES
      const enlaceError = document.createElement("a");
      enlaceError.href = "#";
      enlaceError.textContent = error.mensaje;
      enlaceError.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(error.campo).focus();
      });

      const errorLi = document.createElement("li");
      errorLi.appendChild(enlaceError);
      ol.appendChild(errorLi);

      // 🔹 NUEVO: mostrar error debajo del input
      const errorSpan = document.getElementById("error-" + error.campo);
      if (errorSpan) {
        errorSpan.textContent = error.mensaje;
      }

      // 🔹 NUEVO: pintar el campo en rojo
      const input = document.getElementById(error.campo);
      if (input) {
        input.classList.add("input-error");
      }

    });

    resumenErrores.appendChild(ol);
    resumenErrores.style.display = "block";
    resumenErrores.focus();

  } else {
    alert("Formulario enviado con éxito");
  }
});


// 2. VALIDACIÓN AL SALIR DEL CAMPO (ESTO VA FUERA)
const inputs = [
  document.getElementById("name"),
  document.getElementById("email"),
  document.getElementById("message")
];

inputs.forEach(input => {
  input.addEventListener("blur", function () {
    const errorSpan = document.getElementById("error-" + input.id);

    if (!input.value.trim()) {
      input.classList.add("input-error");
      if (errorSpan) {
        errorSpan.textContent = "Este campo es obligatorio.";
      }
      input.setAttribute("aria-invalid", "true");
    } else {
      input.classList.remove("input-error");
      if (errorSpan) {
        errorSpan.textContent = "";
      }
      input.removeAttribute("aria-invalid");
    }
  });
});