import axios, { AxiosError } from "axios";
import { GraphData } from "~/classes/AnalyticsGraphData";
import type { TicketValidation } from "~/classes/TicketValidation";
import { requireToken } from "~/utils/authentication";
import { relogIfTokenExpired } from "~/utils/authentication";

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
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
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
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
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
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}


export function getTicketValidationsPerDay(eventId: string, date: string, onSuccess: (GraphData: TicketValidation[]) => void, onError: () => void) {
    let baseURL = getAnalyticsBaseURL();
    axios.get<TicketValidation[]>(baseURL + "/validated-tickets/event/" + eventId + "/" + date, {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getAmountOfRedeemedTickets(eventId: string, onSuccess: (amount: number) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    axios.get<number>(baseURL + "/events/" + eventId + "/redeemed/amount", {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getAmountOfValidTickets(eventId: string, onSuccess: (amount: number) => void, onError: () => void) {
    let baseURL = getTicketServiceBaseURL();
    axios.get<number>(baseURL + "/events/" + eventId + "/valid-tickets/amount", {
        headers: {
            Authorization: `Bearer ${requireToken()}`,
        }
    })
        .then((response) => {
            onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}