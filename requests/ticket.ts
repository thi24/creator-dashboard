import axios from "axios";
import type { Ticket } from "~/classes/Ticket";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getTickets(eventId: string, onSuccess: (tickets: Ticket[]) => void, onError: () => void) {
    axios.get<Ticket[]>(getBaseURL() + '/events/' + eventId + '/tickets', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}