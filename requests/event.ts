import axios from "axios";
import { Event } from "~/classes/Event";

function getBaseURL() {
    return useRuntimeConfig().public.baseURL + ":8080/api/event-service";
}

export function getAllEvents(onSuccess: (events: Event[]) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Event[]>(baseURL + "/events")
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}

export function getEventById(id: string, onSuccess: (event: Event) => void, onError: () => void) {
    let baseURL = getBaseURL();
    console.log(baseURL);
    axios.get<Event>(baseURL + "/events/" + id)
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}

export function saveEvent(event: Event, onSuccess: () => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.post(baseURL+"/api/event-service/events", event)
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}