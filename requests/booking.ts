import axios from "axios";
import type { Booking } from "~/classes/Booking";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getAllBookings(eventId: string, page: number, onSuccess: (bookings: Booking[], pageSize: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Booking[]>(baseURL + "/bookings/" + page, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            eventId: eventId
        }
    })
        .then((response) => {
            onSuccess(response.data, response.headers["x-page-size"]);
        })
        .catch(() => {
            onError();
        });
}