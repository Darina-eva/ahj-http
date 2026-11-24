import TicketForm from "./TicketForm";
import TicketView from "./TicketView";

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
    this.form = new TicketForm();
    this.tickets = [];
  }

  init() {
    this.container.innerHTML = `
      <div class="helpdesk">
        <div class="helpdesk-header">
          <button type="button" class="button" data-action="add">Добавить тикет</button>
        </div>
        <div class="helpdesk-error hidden"></div>
        <ul class="tickets"></ul>
      </div>
    `;
    this.list = this.container.querySelector(".tickets");
    this.error = this.container.querySelector(".helpdesk-error");
    this.container
      .querySelector('[data-action="add"]')
      .addEventListener("click", () => this.onAdd());
    this.list.addEventListener("click", (event) => this.onListClick(event));
    this.load();
  }

  async request(action) {
    try {
      this.error.classList.add("hidden");
      return await action();
    } catch (e) {
      this.error.textContent = `Ошибка связи с сервером: ${e.message}`;
      this.error.classList.remove("hidden");
      return null;
    }
  }

  async load() {
    const tickets = await this.request(() => this.ticketService.list());
    if (!tickets) {
      return;
    }
    this.tickets = tickets;
    this.list.innerHTML = "";
    tickets.forEach((ticket) => this.list.append(TicketView.render(ticket)));
  }

  onAdd() {
    this.form.open({ title: "Добавить тикет" }, async (data) => {
      await this.request(() =>
        this.ticketService.create({ ...data, status: false }),
      );
      await this.load();
    });
  }

  async onListClick(event) {
    const element = event.target.closest(".ticket");
    if (!element) {
      return;
    }
    const { id } = element.dataset;
    const ticket = this.tickets.find((item) => item.id === id);
    const button = event.target.closest("[data-action]");
    const action = button ? button.dataset.action : "details";

    if (action === "status") {
      await this.request(() =>
        this.ticketService.update(id, { status: !ticket.status }),
      );
      await this.load();
    } else if (action === "edit") {
      const full = await this.request(() => this.ticketService.get(id));
      if (!full) {
        return;
      }
      this.form.open(
        { title: "Изменить тикет", ticket: full },
        async (data) => {
          await this.request(() => this.ticketService.update(id, data));
          await this.load();
        },
      );
    } else if (action === "delete") {
      this.form.confirm(async () => {
        await this.request(() => this.ticketService.delete(id));
        await this.load();
      });
    } else {
      await this.toggleDescription(element, id);
    }
  }

  async toggleDescription(element, id) {
    const description = element.querySelector(".ticket-description");
    if (!description.classList.contains("hidden")) {
      description.classList.add("hidden");
      return;
    }
    const full = await this.request(() => this.ticketService.get(id));
    if (!full) {
      return;
    }
    description.textContent = full.description || "Нет подробного описания";
    description.classList.remove("hidden");
  }
}
