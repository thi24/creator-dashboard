import axios, { AxiosError } from "axios";
import type { Booking } from "~/classes/Booking";
import type { BookingSearch } from "~/classes/BookingSearch";
import { relogIfTokenExpired } from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getAllBookings(eventId: string, search: BookingSearch, page: number, onSuccess: (bookings: Booking[], pageSize: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Booking[]>(baseURL + "/bookings/" + page + 
    '?eventId=' + eventId + 
    '&term=' + search.term +
    '&bookedFrom=' + search.dateFrom, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data, response.headers["x-page-size"]);
    })
    .catch((error: AxiosError) => {
        relogIfTokenExpired(error)
        onError();
    });
}
