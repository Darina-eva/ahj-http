import { escapeHtml, formatDate } from "./utils";

export default class TicketView {
  static render(ticket) {
    const element = document.createElement("li");
    element.className = "ticket";
    element.dataset.id = ticket.id;
    element.innerHTML = `
      <div class="ticket-row">
        <button type="button" class="ticket-status" data-action="status" title="Отметить выполнение">${ticket.status ? "✔" : ""}</button>
        <span class="ticket-name">${escapeHtml(ticket.name)}</span>
        <span class="ticket-date">${formatDate(ticket.created)}</span>
        <button type="button" class="round-button" data-action="edit" title="Редактировать">✎</button>
        <button type="button" class="round-button" data-action="delete" title="Удалить">x</button>
      </div>
      <div class="ticket-description hidden"></div>
    `;
    return element;
  }
}
