/* ==================
    MENU HAMBURGUESA
   ==================*/
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");
const dropdowns = document.querySelectorAll(".dropdown");
const sections = document.querySelectorAll(".section");
const emailRegex = /^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const isEmailValid = (value) => emailRegex.test(value);
let isLoggedIn = false;
const goToSection = (sectionId) => {
  if (!sectionId) return;
  if (sectionId === "dashboard" && !isLoggedIn) return;

  sections.forEach((sec) => sec.classList.remove("active"));
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
    targetSection.style.animation = "fadeIn 0.6s ease";
  }

  navLinks.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("data-section") === sectionId);
  });

  dropdowns.forEach((dd) => dd.classList.remove("open"));
  menuToggle.classList.remove("active");
  navbar.classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Al hacer clic en el boton hamburguesa
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navbar.classList.toggle("show");
});

// Navegacion principal y submenus
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const isDropdownToggle = link.classList.contains("dropdown-toggle");

    // En movil, el toggle solo abre/cierra el submenu
    if (isDropdownToggle && window.innerWidth <= 900) {
      event.preventDefault();
      link.closest(".dropdown")?.classList.toggle("open");
      return;
    }

    event.preventDefault(); // Evita el salto de pagina

    // Obtiene el nombre de la seccion desde el atributo data-section
    const sectionId = link.getAttribute("data-section");

    // Si el enlace no tiene seccion, no hace nada
    if (!sectionId) return;

    goToSection(sectionId);
  });
});

/* ===================================================================
   BOTONES INTERNOS (como "Comienza a entrenar" o "Registrarme ahora")
   ===================================================================*/

const internalButtons = document.querySelectorAll("[data-section]");
internalButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const sectionId = btn.getAttribute("data-section");
    if (!sectionId) return;

    goToSection(sectionId);
  });
});

/* ===========================================
   EFECTO DE TRANSICION GLOBAL ENTRE SECCIONES 
   ===========================================*/
document.addEventListener("DOMContentLoaded", () => {
  sections.forEach((sec) => {
    sec.addEventListener("animationend", () => {
      sec.style.animation = ""; // Limpia la animacion para reutilizarla
    });
  });
});

/* =======================
   FORMULARIO DE CONTACTO
   ======================= */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const asunto = document.getElementById("asunto");
  const mensaje = document.getElementById("mensaje");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validaciones basicas
      if (
        !nombre.value.trim() ||
        !correo.value.trim() ||
        !asunto.value.trim() ||
        !mensaje.value.trim()
      ) {
        status.textContent = "Completa todos los campos antes de enviar.";
        status.style.color = "crimson";
        return;
      }

      if (!isEmailValid(correo.value.trim())) {
        status.textContent = "Ingresa un correo electronico valido.";
        status.style.color = "crimson";
        return;
      }

      // Simula el envio
      status.textContent = "Enviando mensaje...";
      status.style.color = "#0077ff";

      setTimeout(() => {
        status.textContent = "¡Tu mensaje fue enviado correctamente!";
        status.style.color = "green";
        form.reset();
      }, 1500);
    });
  }
});

/* =======================
   FORMULARIO DE LOGIN
   ======================= */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const dashboardLink = document.querySelector('a[data-section="dashboard"]');
  if (!loginForm) return;

  const status = document.getElementById("login-status");
  const correo = document.getElementById("login-correo");
  const password = document.getElementById("login-password");

  loginForm.noValidate = true;
  if (dashboardLink) dashboardLink.classList.add("hidden");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    const emailVal = correo.value.trim();
    const passVal = password.value.trim();

    if (!emailVal || !isEmailValid(emailVal)) {
      status.textContent = "Ingresa un correo electronico valido.";
      status.style.color = "crimson";
      return;
    }

    if (!passVal) {
      status.textContent = "Este es un campo obligatorio.";
      status.style.color = "crimson";
      return;
    }

    loginForm.reset();
    isLoggedIn = true;
    if (dashboardLink) dashboardLink.classList.remove("hidden");

    goToSection("inicio");
  });
});

/* =======================
   FORMULARIO DE REGISTRO
   ======================= */
document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");
  if (!registroForm) return;

  const status = document.getElementById("registro-status");
  const regNombre = document.getElementById("reg-nombre");
  const regApellido = document.getElementById("reg-apellido");
  const regCorreo = document.getElementById("reg-correo");
  const regTelefono = document.getElementById("reg-telefono");
  const regPass = document.getElementById("reg-pass");
  const regPass2 = document.getElementById("reg-pass2");
  const brigadaRadios = registroForm.querySelectorAll('input[name="brigada"]');
  const uploadWrapper = document.getElementById("brigada-upload");
  const fileInput = document.getElementById("reg-certificado");
  const previewWrapper = document.getElementById("brigada-preview-wrapper");
  const previewImg = document.getElementById("brigada-preview");

  const toggleUpload = (value) => {
    const show = value === "si";
    uploadWrapper.classList.toggle("hidden", !show);
    if (!show) {
      fileInput.value = "";
      previewWrapper.style.display = "none";
      previewImg.src = "";
    }
  };

  brigadaRadios.forEach((radio) => {
    radio.addEventListener("change", () => toggleUpload(radio.value));
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImg.src = ev.target?.result;
        previewWrapper.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewWrapper.style.display = "none";
      previewImg.src = "";
    }
  });

  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    const nombreVal = regNombre.value.trim();
    const apellidoVal = regApellido.value.trim();
    const correoVal = regCorreo.value.trim();
    const telVal = regTelefono.value.trim();
    const passVal = regPass.value.trim();
    const pass2Val = regPass2.value.trim();
    const brigadaVal = Array.from(brigadaRadios).find((r) => r.checked)?.value;

    if (!nombreVal || !apellidoVal || !correoVal || !telVal || !passVal || !pass2Val) {
      status.textContent = "Completa todos los campos obligatorios.";
      status.style.color = "crimson";
      return;
    }

    if (!/^\d{9}$/.test(telVal)) {
      status.textContent = "El numero de telefono debe tener 9 digitos.";
      status.style.color = "crimson";
      return;
    }

    if (!isEmailValid(correoVal)) {
      status.textContent = "Ingresa un correo electronico valido.";
      status.style.color = "crimson";
      return;
    }

    if (passVal !== pass2Val) {
      status.textContent = "Las contraseñas deben coincidir.";
      status.style.color = "crimson";
      return;
    }

    if (brigadaVal === "si" && (!fileInput.files || fileInput.files.length === 0)) {
      status.textContent = "Sube la imagen de tu certificado de brigadista.";
      status.style.color = "crimson";
      return;
    }

    status.textContent = "Registro completado (demo).";
    status.style.color = "#0077ff";

    setTimeout(() => {
      registroForm.reset();
      toggleUpload("no");
      status.textContent = "Listo, tus datos fueron enviados (simulado).";
      status.style.color = "green";
      previewWrapper.style.display = "none";
      previewImg.src = "";
    }, 800);
  });
});
