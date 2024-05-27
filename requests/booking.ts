import axios, { AxiosError } from "axios";
import type { Booking } from "~/classes/Booking";
import { relogIfTokenExpired } from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getBookingsForEvent(eventId: string, page: number, onSuccess: (events: Booking[] , pageSize: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    const pageSize = 15;
    axios.get<Booking[]>(baseURL + "/bookings/event/" + eventId + "/" + page + "/" + pageSize, {
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
