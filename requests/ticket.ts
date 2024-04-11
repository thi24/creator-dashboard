import axios from "axios";
import type { Ticket } from "~/classes/Ticket";

function getBaseURL() {
    return useRuntimeConfig().public.baseURL + ":8081/api/ticket-service";
}

export function getTickets(onSuccess: (tickets: Ticket[]) => void, onError: () => void) {
    axios.get<Ticket[]>(getBaseURL() + '/tickets/438758439759843758943759843')
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}