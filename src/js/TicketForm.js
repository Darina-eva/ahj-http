import Modal from "./Modal";
import { escapeHtml } from "./utils";

export default class TicketForm {
  constructor() {
    this.modal = new Modal();
  }

  open({ title, ticket = {} }, onSubmit) {
    this.modal.open(
      `
        <h2 class="modal-title">${title}</h2>
        <label class="modal-label">
          Краткое описание
          <input class="modal-input" name="name" value="${escapeHtml(ticket.name)}" />
        </label>
        <label class="modal-label">
          Подробное описание
          <textarea class="modal-input modal-textarea" name="description">${escapeHtml(ticket.description)}</textarea>
        </label>
      `,
      async (form) => {
        const name = form.elements.name.value.trim();
        if (!name) {
          form.elements.name.classList.add("invalid");
          form.elements.name.focus();
          return;
        }
        await onSubmit({
          name,
          description: form.elements.description.value.trim(),
        });
        this.modal.close();
      },
    );
  }

  confirm(onConfirm) {
    this.modal.open(
      `
        <h2 class="modal-title">Удалить тикет</h2>
        <p class="modal-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
      `,
      async () => {
        await onConfirm();
        this.modal.close();
      },
    );
  }
}
