import axios, {AxiosError} from "axios";
import type {TicketType} from "~/classes/TicketType";
import {relogIfTokenExpired} from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.eventService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}


export function getAllTicketTypes(id: string, onSuccess: (TicketType: TicketType[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<TicketType[]>(baseURL + "/ticket-types?eventId=" + id, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function saveTicketType(TicketType: TicketType, onSuccess: (TicketType: TicketType) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL + "/ticket-types", TicketType, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function updateTicketType(ticketType: TicketType, onSuccess: (TicketType: TicketType) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.put(baseURL + "/ticket-types/" + ticketType.id, ticketType, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}
