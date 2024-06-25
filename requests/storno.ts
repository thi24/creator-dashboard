import axios from "axios";
import type {Storno} from "~/classes/Storno";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getStorno(eventId: string, onSuccess: (stornos: Storno[]) => void, onError: () => void) {
    axios.get<Storno[]>(getBaseURL() + '/cancellations/' + eventId)
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}

//Request to ProcessEngine -> to be defined
export function responseToProcessEngine(eventId?: string, ticketId?: string, price?: number, kundenId?: string, response?: boolean, stornoId?: string) {
    const token = useCookie('id_token')
    axios.post("https://engine.pe.benevolo.de/v1.0/messages/administratorResponse?execution_mode=synchronous",
    {
        "eventId": eventId, 
        "ticketId": ticketId, 
        "price": price, 
        "kundenId": kundenId,
        "stornoResponse": response,
        "stornoId": stornoId
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