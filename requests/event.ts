import axios from "axios";

function getBaseURL() {
    return useRuntimeConfig().public.baseURL + ":8080/api/event-service";
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
    axios.post(baseURL+"/api/event-service/events", event, {
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