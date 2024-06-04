import axios, {AxiosError} from "axios";
import type {Ticket} from "~/classes/Ticket";
import {relogIfTokenExpired} from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getTickets(eventId: string, page: number, onSuccess: (tickets: Ticket[], pageSize: number) => void, onError: () => void) {
    const pageSize = 15;
    axios.get<Ticket[]>(getBaseURL() + '/events/' + eventId + '/tickets/' + page + "/" + pageSize, {})
        .then((response) => {
            onSuccess(response.data, response.headers["x-page-size"]);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getTicketsByBookingItemId(bookingItemId: string, onSuccess: (tickets: Ticket[]) => void, onError: () => void) {
    axios.get<Ticket[]>(getBaseURL() + '/tickets', {
        params: {
            bookingItemId: bookingItemId
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}

export function redeemTicket(ticketId: string, onSuccess: () => void, onError: () => void) {
    axios.patch(getBaseURL() + '/tickets/' + ticketId + '/status', {}, {})
        .then(() => {
            onSuccess();
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}