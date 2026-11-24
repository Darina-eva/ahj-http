import createRequest from "./api/createRequest";
import Ticket from "./Ticket";

export default class TicketService {
  async list() {
    const data = await createRequest({ params: { method: "allTickets" } });
    return data.map((item) => new Ticket(item));
  }

  async get(id) {
    const data = await createRequest({
      params: { method: "ticketById", id },
    });
    return new Ticket(data);
  }

  create(data) {
    return createRequest({
      method: "POST",
      params: { method: "createTicket" },
      data,
    });
  }

  update(id, data) {
    return createRequest({
      method: "POST",
      params: { method: "updateById", id },
      data,
    });
  }

  delete(id) {
    return createRequest({ params: { method: "deleteById", id } });
  }
}
