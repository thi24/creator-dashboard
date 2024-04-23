import axios from "axios";
import type { Ticket } from "~/classes/Ticket";
import type { TicketType } from "~/classes/TicketType";

function getBaseURL() {
    return useRuntimeConfig().public.eventService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}


export function getAllTicketTypes(id: string, onSuccess: (TicketType: TicketType[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<TicketType[]>(baseURL + "/ticket-types?eventId=" + id, {
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

export function saveTicketType(TicketType: TicketType, onSuccess: (TicketType: TicketType) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL + "/ticket-types", TicketType, {
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

