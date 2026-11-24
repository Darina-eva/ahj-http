export default class Modal {
  constructor() {
    this.element = null;
  }

  open(content, onSubmit) {
    this.close();
    this.element = document.createElement("div");
    this.element.className = "modal-overlay";
    this.element.innerHTML = `
      <form class="modal" novalidate>
        ${content}
        <div class="modal-buttons">
          <button type="button" class="button" data-action="cancel">Отмена</button>
          <button type="submit" class="button">Ok</button>
        </div>
      </form>
    `;
    const form = this.element.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit(form);
    });
    form
      .querySelector('[data-action="cancel"]')
      .addEventListener("click", () => this.close());
    document.body.append(this.element);
    const field = form.querySelector("input, textarea");
    if (field) {
      field.focus();
    }
  }

  close() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
