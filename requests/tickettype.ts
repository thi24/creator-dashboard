import axios from "axios";
import type { TicketType } from "~/classes/TicketType";

function getBaseURL() {
    return useRuntimeConfig().public.baseURL + "/api/event-service";
}


export function getAllTicketTypes(id: string, onSuccess: (TicketType: TicketType[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<TicketType[]>(baseURL + "/ticket-types?eventId=" + id)
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}

export function saveTicketType(TicketType: TicketType, onSuccess: () => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL+"/api/event-service/ticket-types", TicketType)
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}

