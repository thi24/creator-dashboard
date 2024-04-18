import axios from "axios";
import type { Ticket } from "~/classes/Ticket";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getTickets(eventId: string, page: number, onSuccess: (tickets: Ticket[], pageSize: number) => void, onError: () => void) {
    const pageSize = 15;
    axios.get<Ticket[]>(getBaseURL() + '/events/' + eventId + '/tickets/' + page + "/" + pageSize, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data, response.headers["x-page-size"]);
    })
    .catch(() => {
        onError();
    });
}