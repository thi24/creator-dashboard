//To be defined

import axios from "axios";
import type { Storno } from "~/classes/Storno";
import { requireToken } from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getStorno(eventId: string, page: number, onSuccess: (stornos: Storno[], pageSize: number) => void, onError: () => void) {
    const pageSize = 15;
    axios.get<Storno[]>(getBaseURL() + '/events/' + eventId + '/tickets/' + page + "/" + pageSize, {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then((response) => {
        onSuccess(response.data, response.headers["x-page-size"]);
    })
    .catch(() => {
        onError();
    });
}

export function redeemTicket(ticketId: string, onSuccess: () => void, onError: () => void) {
    axios.patch(getBaseURL() + '/tickets/' + ticketId + '/status', {}, {
        headers: {
            Authorization: `Bearer ${requireToken()}`
        }
    })
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}