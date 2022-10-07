/* global ContactForm */

class UtilForm {
  constructor(photographer) {
    this.photographer = photographer;

    this.$mainWrapper = document.getElementById("main");
    this.$modal = document.getElementById("contact_modal");
    this.$body = document.querySelector("body");

    // close button
    this.$close_button = document.getElementById("close_button");
  }

  manageEvents() {
    document.getElementById("close_button").addEventListener("click", () => {
      this.closeModal();
    });

    // close modal when press Escape
    document.addEventListener("keydown", (e) => {
      if (
        this.$modal.getAttribute("aria-hidden") === "false" &&
        e.key === "Escape"
      ) {
        this.closeModal();
      }
    });

    // close modal when press Enter on close Btn
    document.getElementById("close_button").addEventListener("keydown", (e) => {
      if (
        this.$modal.getAttribute("aria-hidden") === "false" &&
        e.key === "Enter"
      ) {
        this.closeModal();
      }
    });

    // listen to form submission
    document
      .getElementById("form")
      .addEventListener("submit", (e) => this.submit(e));
  }

  displayModal() {
    // empty modal
    this.$modal.innerHTML = "";
    // insert contact form
    const Form = new ContactForm(this.photographer);
    const formTemplate = Form.createForm();
    this.$modal.appendChild(formTemplate);
    this.$modal.style.display = "block";

    // set aria attributes
    this.$modal.setAttribute(
      "aria-describedby",
      `Contactez-moi ${this.photographer.name}`
    );
    this.$mainWrapper.setAttribute("aria-hidden", "true");
    this.$modal.setAttribute("aria-hidden", "false");
    // prevent scroll on body
    this.$body.classList.add("no-scroll");
    document.getElementById("firstname").focus();
    this.manageEvents();
    this.manageValidation();
  }

  closeModal() {
    document.getElementById("form").reset();
    document.getElementById("error-message").textContent = "";
    this.$modal.style.display = "none";
    // set aria attributes
    this.$mainWrapper.setAttribute("aria-hidden", "false");
    this.$modal.setAttribute("aria-hidden", "true");
    this.$body.classList.remove("no-scroll");
  }

  // check if value has minimum 3 caracters
  isMinCaracters(value) {
    return value.length >= 3;
  }

  // check if email is valid
  isEmailValid(value) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  manageValidation() {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    firstname.addEventListener("input", (e) => {
      if (this.isMinCaracters(e.target.value)) {
        firstname.setAttribute("aria-invalid", "false");
      }
    });

    lastname.addEventListener("input", (e) => {
      if (this.isMinCaracters(e.target.value)) {
        lastname.setAttribute("aria-invalid", "false");
      }
    });

    email.addEventListener("input", (e) => {
      if (this.isEmailValid(e.target.value)) {
        email.setAttribute("aria-invalid", "false");
      }
    });

    message.addEventListener("input", (e) => {
      if (this.isMinCaracters(e.target.value)) {
        message.setAttribute("aria-invalid", "false");
      }
    });
  }

  validate() {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errorMessage = document.getElementById("error-message");
    if (!this.isMinCaracters(firstname.value)) {
      firstname.setAttribute("aria-invalid", "true");
      firstname.classList.add("invalid");
      errorMessage.textContent =
        "Le prénom doit contenir au moins 3 caractères.";
      return false;
    } else if (!this.isMinCaracters(lastname.value)) {
      lastname.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Le nom doit contenir au moins 3 caractères.";
      return false;
    } else if (!this.isEmailValid(email.value)) {
      email.setAttribute("aria-invalid", "true");
      errorMessage.textContent = "Le format de l'email est incorrect.";
      return false;
    } else if (!this.isMinCaracters(message.value)) {
      message.setAttribute("aria-invalid", "true");
      errorMessage.textContent =
        "Le message doit contenir au moins 3 caractères.";
      return false;
    } else {
      return true;
    }
  }

  submit(event) {
    event.preventDefault();
    this.validate();
    if (this.validate()) {
      const data = new FormData();
      data.append("firstname", document.getElementById("firstname").value);
      data.append("lastname", document.getElementById("lastname").value);
      data.append("email", document.getElementById("email").value);
      data.append("message", document.getElementById("message").value);
      const result = {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        email: data.get("email"),
        message: data.get("message"),
      };
      console.log(result);
      this.closeModal();
    }
  }
}
