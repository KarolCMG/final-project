// Contact page with EmailJS integration (vanilla JS, no innerHTML)
import "../assets/styles/contact.css";

export default function contact(container) {
  // Helper function to create elements
  function $(tag, props = {}, ...children) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === 'class') {
        el.className = v;
      } else if (k === 'style' && typeof v === 'object') {
        Object.assign(el.style, v);
      } else if (k === 'for') {
        el.htmlFor = v;
      } else {
        el.setAttribute(k, v);
      }
    });
    children.flat().forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });
    return el;
  }

  container.innerHTML = "";

  // Inputs with 'name' attributes required by EmailJS
  const nameInput = $("input", {
    type: "text",
    class: "contact-input",
    id: "contact-name",
    name: "from_name", // EmailJS variable
    placeholder: "Your name",
    required: true
  });
  const emailInput = $("input", {
    type: "email",
    class: "contact-input",
    id: "contact-email",
    name: "from_email", // EmailJS variable
    placeholder: "Your email",
    required: true
  });
  const messageInput = $("textarea", {
    class: "contact-input",
    id: "contact-message",
    name: "message", // EmailJS variable
    placeholder: "Your message",
    rows: 4,
    required: true
  });

  // Success message (hidden by default)
  const successMsg = $("div", {
    class: "contact-success",
    style: { display: "none" }
  }, "Your message has been sent! (simulated)");

  // Contact form
  const form = $("form", { class: "contact-form" },
    $("label", { for: "contact-name" }, "Name"),
    nameInput,
    $("label", { for: "contact-email" }, "Email"),
    emailInput,
    $("label", { for: "contact-message" }, "Message"),
    messageInput,
    $("button", { type: "submit", class: "contact-btn" }, "Send"),
    successMsg
  );

  // EmailJS integration on submit
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    // Opcional: validaciones adicionales aquí
    // Reemplaza los siguientes valores con los de tu cuenta de EmailJS
    const SERVICE_ID = "TU_SERVICE_ID";
    const TEMPLATE_ID = "TU_TEMPLATE_ID";
    // El init se hace en el index.html con tu PUBLIC_KEY
    if (window.emailjs) {
      window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
        .then(function() {
          successMsg.style.display = "block";
          setTimeout(() => {
            successMsg.style.display = "none";
            form.reset();
          }, 2500);
        }, function(error) {
          alert("Error sending message: " + error.text);
        });
    } else {
      alert("EmailJS is not loaded. Check your CDN script in index.html.");
    }
  });

  // Main layout
  const mainDiv = $("div", { class: "contact-layout" },
    $("h1", { class: "contact-title" }, "Contact Us"),
    $("p", { class: "contact-desc" }, "We would love to hear from you! Fill out the form below."),
    form
  );

  container.appendChild(mainDiv);
}


