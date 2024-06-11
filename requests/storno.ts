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
    axios.post("https://pea.benevolo.de/atlas_engine/api/v1/messages/StornoResponse/trigger?processInstanceId=ticketcancellation_process",
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
            "Accept": "/",
            //"Authorization": "Bearer ",
            "Conent-Type": "application/json"
        }
        
    })
        .then(/* IDK */)
        .catch(/* IDK */);
}