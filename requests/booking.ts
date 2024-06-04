import axios, {AxiosError} from "axios";
import type {Booking} from "~/classes/Booking";
import type {BookingSearch} from "~/classes/BookingSearch";
import {relogIfTokenExpired} from "~/utils/authentication";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getAllBookings(eventId: string, search: BookingSearch, page: number, onSuccess: (bookings: Booking[], pageSize: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<Booking[]>(baseURL + "/bookings/" + page + '?eventId=' + eventId + "&" + jsonToUrlParams(search), {})
        .then((response) => {
            onSuccess(response.data, response.headers["x-page-size"]);
        })
        .catch((error: AxiosError) => {
            relogIfTokenExpired(error)
            onError();
        });
}

export function getTotalPrice(eventId: string, onSuccess: (totalPrice: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<number>(baseURL + "/bookings/total-price", {
        params: {
            eventId: eventId
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

export function getTotalBookings(eventId: string, onSuccess: (bookings: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<number>(baseURL + "/bookings/total-bookings", {
        params: {
            eventId: eventId
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

export function getTotalTickets(eventId: string, onSuccess: (tickets: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<number>(baseURL + "/bookings/total-tickets", {
        params: {
            eventId: eventId
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

export function getAveragePrice(eventId: string, onSuccess: (avgPrice: number) => void, onError: () => void) {
    let baseURL = getBaseURL();
    axios.get<number>(baseURL + "/bookings/average-price", {
        params: {
            eventId: eventId
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