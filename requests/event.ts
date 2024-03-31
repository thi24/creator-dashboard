import axios from "axios";
import type { Event } from "~/classes/Event";

export function getAllEvents(onSuccess: (events: Event[]) => void, onError: () => void) {
    axios.get<Event[]>('http://localhost:8080/events')
    .then((response) => {
        onSuccess(response.data);
    })
    .catch(() => {
        onError();
    });
}