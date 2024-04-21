import axios from "axios";
import { Event } from "~/classes/Event";
import { byteToBase64 } from "~/utils/util";

function getBaseURL() {
    return useRuntimeConfig().public.eventService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getAllEvents(onSuccess: (events: Event[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Event[]>(baseURL + "/events", {
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

export function getEventById(id: string, onSuccess: (event: Event) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Event>(baseURL + "/events/" + id, {
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
        onError();
    };

export function saveEvent(event: Event, onSuccess: () => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL + "/events", event, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}

export function getImageForEvent(id: string, onSuccess: (image: string) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get(baseURL + "/events/" + id + "/image", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        responseType: 'arraybuffer'
    })
    .then((response) => {
        let base64Image = byteToBase64(response.data);
        onSuccess(base64Image);
    })
    .catch(() => {
        onError();
    });
}