import axios from "axios";
import { Event } from "~/classes/Event";
let baseURL = useRuntimeConfig().public.baseURL

export function getAllEvents(onSuccess: (events: Event[]) => void, onError: () => void) {
    axios.get<Event[]>(baseURL+"/api/event-service/events")
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}

export function saveEvent(event: Event, onSuccess: () => void, onError: () => void) {
    axios.post(baseURL+"/api/event-service/events", event)
    .then(() => {
        onSuccess();
    })
    .catch(() => {
        onError();
    });
}