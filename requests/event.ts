import axios, {AxiosError} from "axios";
import {Event} from "~/classes/Event";
import {byteToBase64} from "~/utils/util";
import {relogIfTokenExpired} from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.eventService.baseURL;
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

export function updateEntry(event: Event, onSuccess: (event: Event) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.put(baseURL + "/events/" + event.id, event, {})
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function responseToProcessEngine(event: Event, onSuccess: () => void, onError: () => void) {
    const peToken = import.meta.env.PE_TOKEN
    const token = useCookie('id_token')
    axios.post("https://engine.pe.benevolo.de/v1.0/messages/Eventanlegen?execution_mode=synchronous",
        {
            event
        },
        {
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-Type": "application/json"
            }

        })
        .then(/* IDK */)
        .catch(/* IDK */);
}