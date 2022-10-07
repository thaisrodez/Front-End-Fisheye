class ContactForm {
  constructor(photographer) {
    this._name = photographer.name;

    // contact modal inner div
    this.$contactModal = document.createElement("div");
    this.$contactModal.classList.add("modal");
  }

  getHeader() {
    const header = document.createElement("header");
    const formTitle = document.createElement("h2");
    const closeButton = document.createElement("img");

    formTitle.setAttribute("id", "contact-form");
    closeButton.setAttribute("src", "assets/icons/close.svg");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("id", "close_button");
    closeButton.setAttribute("alt", "Fermer le formulaire de contact");

    formTitle.innerHTML = `Contactez-moi ${this._name}`;

    header.appendChild(formTitle);
    header.appendChild(closeButton);
    return header;
  }

  getForm() {
    const form = document.createElement("form");
    const formDiv = document.createElement("div");
    const firstnameLabel = document.createElement("label");
    const lastnameLabel = document.createElement("label");
    const emailLabel = document.createElement("label");
    const messageLabel = document.createElement("label");
    const firstnameInput = document.createElement("input");
    const lastnameInput = document.createElement("input");
    const emailInput = document.createElement("input");
    const messageInput = document.createElement("textarea");
    const errorMessage = document.createElement("p");
    const submitButton = document.createElement("button");

    // setAttributes
    form.setAttribute("method", "post");
    form.setAttribute("id", "form");
    formDiv.setAttribute("role", "group");
    formDiv.setAttribute("aria-labelledby", "contact-form");
    // labels
    firstnameLabel.setAttribute("for", "firstname");
    lastnameLabel.setAttribute("for", "lastname");
    emailLabel.setAttribute("for", "email");
    messageLabel.setAttribute("for", "message");
    // input id
    firstnameInput.setAttribute("id", "firstname");
    lastnameInput.setAttribute("id", "lastname");
    emailInput.setAttribute("id", "email");
    messageInput.setAttribute("id", "message");
    errorMessage.setAttribute("id", "error-message");
    // input name
    firstnameInput.setAttribute("name", "firstname");
    lastnameInput.setAttribute("name", "lastname");
    emailInput.setAttribute("name", "email");
    messageInput.setAttribute("name", "message");
    // input type
    firstnameInput.setAttribute("type", "text");
    lastnameInput.setAttribute("type", "text");
    emailInput.setAttribute("type", "email");
    messageInput.setAttribute("rows", "8");
    // input describedby
    firstnameInput.setAttribute("aria-describedby", "firstname");
    lastnameInput.setAttribute("aria-describedby", "lastname");
    emailInput.setAttribute("aria-describedby", "email");
    messageInput.setAttribute("aria-describedby", "message");
    // required
    firstnameInput.setAttribute("required", "");
    lastnameInput.setAttribute("required", "");
    emailInput.setAttribute("required", "");
    messageInput.setAttribute("required", "");
    // required
    firstnameInput.setAttribute("aria-required", "true");
    lastnameInput.setAttribute("aria-required", "true");
    emailInput.setAttribute("aria-required", "true");
    messageInput.setAttribute("aria-required", "true");
    // button
    submitButton.classList.add("contact_button");
    submitButton.setAttribute("type", "submit");
    // submitButton.setAttribute("onClick", "submit()");

    // text content
    firstnameLabel.textContent = "Prénom";
    lastnameLabel.textContent = "Nom";
    emailLabel.textContent = "Email";
    messageLabel.textContent = "Votre message";
    submitButton.textContent = "Envoyer";

    // insert element in DOM
    formDiv.appendChild(firstnameLabel);
    formDiv.appendChild(firstnameInput);
    formDiv.appendChild(lastnameLabel);
    formDiv.appendChild(lastnameInput);
    formDiv.appendChild(emailLabel);
    formDiv.appendChild(emailInput);
    formDiv.appendChild(messageLabel);
    formDiv.appendChild(messageInput);
    formDiv.appendChild(errorMessage);
    form.appendChild(formDiv);
    form.appendChild(submitButton);
    return form;
  }

  createForm() {
    const formHeader = this.getHeader();
    const formBody = this.getForm();
    this.$contactModal.appendChild(formHeader);
    this.$contactModal.appendChild(formBody);
    return this.$contactModal;
  }
}
