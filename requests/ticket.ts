import axios from "axios";
import type { Ticket } from "~/classes/Ticket";
import { requireToken } from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getTickets(eventId: string, page: number, onSuccess: (tickets: Ticket[], pageSize: number) => void, onError: () => void) {
    const pageSize = 15;
    axios.get<Ticket[]>(getBaseURL() + '/events/' + eventId + '/tickets/' + page + "/" + pageSize, {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data, response.headers["x-page-size"]);
    })
    .catch(() => {
        onError();
    });
}

export function redeemTicket(ticketId: string, onSuccess: () => void, onError: () => void) {
    axios.patch(getBaseURL() + '/tickets/' + ticketId + '/status', {}, {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}