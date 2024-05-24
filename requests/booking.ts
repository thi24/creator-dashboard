import axios from "axios";
import type { Booking } from "~/classes/Booking";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getAllBookings(eventId: string, onSuccess: (events: Booking[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Booking[]>(baseURL + "/bookings", {
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