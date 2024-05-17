import axios from "axios";
import { GraphData } from "~/classes/AnalyticsGraphData";
import { requireToken } from "~/utils/authentication";

function getAnalyticsBaseURL() {
    return useRuntimeConfig().public.analyticsService.baseURL;
}

function getTicketServiceBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export async function getPageViews(eventId: string, dateFrom: string, dateTo: string, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getAnalyticsBaseURL();
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/event-views/" + dateFrom + "/" + dateTo, {
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


export async function getSoldTickets(eventId: string, dateFrom: string, dateTo: string, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/ticketstatsbyday/" + dateFrom + "/" + dateTo, {
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


export async function getBookings(eventId: string, dateFrom: string, dateTo: string, onSuccess: (GraphData: GraphData[]) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    axios.get<GraphData[]>(baseURL + "/events/" + eventId + "/bookingstatsbyday/" + dateFrom + "/" + dateTo, {
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