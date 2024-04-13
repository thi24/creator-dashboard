import axios from "axios";
import type { Ticket } from "~/classes/Ticket";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseUrl;
}

export function getTickets(eventId: string, onSuccess: (tickets: Ticket[]) => void, onError: () => void) {
    axios.get<Ticket[]>(getBaseURL() + '/tickets/' + eventId)
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}