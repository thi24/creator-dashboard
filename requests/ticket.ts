import axios, { AxiosError } from "axios";
import type { BookingSearch } from "~/classes/BookingSearch";
import type { Ticket } from "~/classes/Ticket";
import { requireToken } from "~/utils/authentication";
import { relogIfTokenExpired } from "~/utils/authentication";

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
    axios.put(getBaseURL() + '/tickets/' + ticketId + '/status', {}, {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then(() => {
        onSuccess();
    })
    .catch((error: AxiosError) => {
        relogIfTokenExpired(error)
        onError();
    });
}

export function getTicketsBySearch(eventId: string, search: BookingSearch, page: number, onSuccess: (bookings: Ticket[], pageSize: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Ticket[]>(baseURL + "/tickets/search/" + page + '?eventId=' + eventId + "&" + jsonToUrlParams(search), {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data, response.headers["x-page-size"]);
    })
    .catch((error: AxiosError) => {
        relogIfTokenExpired(error)
        onError();
    });
    axios.put(getBaseURL() + '/tickets/' + ticketId + '/status', {}, {})
        .then(() => {
            onSuccess();
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}