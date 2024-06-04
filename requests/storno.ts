//To be defined

import axios from "axios";
import type {Storno} from "~/classes/Storno";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getStorno(eventId: string, page: number, onSuccess: (stornos: Storno[], pageSize: number) => void, onError: () => void) {
    const pageSize = 15;
    axios.get<Storno[]>(getBaseURL() + '/events/' + eventId + '/tickets/' + page + "/" + pageSize, {})
        .then((response) => {
            onSuccess(response.data, response.headers["x-page-size"]);
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
        .catch(() => {
            onError();
        });
}