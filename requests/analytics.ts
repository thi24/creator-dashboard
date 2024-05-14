import axios from "axios";
import { GraphData } from "~/classes/AnalyticsGraphData";
import { requireToken } from "~/utils/authentication";

function getAnalyticsBaseURL() {
    return useRuntimeConfig().public.analyticsService.baseURL;
}

function getTicketServiceBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export async function getPageViews(eventId: string, dateFrom: Date, dateTo: Date, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getAnalyticsBaseURL();
    let dateFromIso = dateFrom.toISOString().substring(0, 10);
    let dateToIso = dateTo.toISOString().substring(0, 10);
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/event-views/" + dateFromIso + "/" + dateToIso, {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}


export async function getSoldTickets(eventId: string, dateFrom: Date, dateTo: Date, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    let dateFromIso = dateFrom.toISOString().substring(0, 10);
    let dateToIso = dateTo.toISOString().substring(0, 10);
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/ticketstatsbyday/" + dateFromIso + "/" + dateToIso, {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}


export async function getBookings(eventId: string, dateFrom: Date, dateTo: Date, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    let dateFromIso = dateFrom.toISOString().substring(0, 10);
    let dateToIso = dateTo.toISOString().substring(0, 10);
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/bookingstatsbyday/" + dateFromIso + "/" + dateToIso, {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}