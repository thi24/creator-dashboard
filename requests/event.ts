import axios, {AxiosError} from "axios";
import {Event} from "~/classes/Event";
import {byteToBase64} from "~/utils/util";
import {relogIfTokenExpired} from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.eventService.baseURL;
}

function getToken() {
    const token = useCookie('token')
    return token.value
}

export function getAllEvents(onSuccess: (events: Event[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Event[]>(baseURL + "/events", {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getEventById(id: string, onSuccess: (event: Event) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Event>(baseURL + "/events/" + id, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
    onError();
};

export function saveEvent(event: FormData, onSuccess: (event: Event) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL + "/events", event, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getImageForEvent(id: string, onSuccess: (image: string) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get(baseURL + "/events/" + id + "/image", {
        responseType: 'arraybuffer'
    })
        .then((response) => {
            let base64Image = byteToBase64(response.data);
            onSuccess(base64Image);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}