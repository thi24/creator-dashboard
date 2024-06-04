import { defineStore } from "pinia"
import { BookingSearch } from "~/classes/BookingSearch";
import { Event } from "~/classes/Event";
import { TicketStatus } from "~/classes/TicketStatus";
import { getEventById } from "~/requests/event";

export const useBookingSearchStore = defineStore('booking-search', {
    state: () => ({ 
        search: new BookingSearch(),
        ticketStatus: undefined as TicketStatus | undefined
    }),
    getters: {
        getSearch: (state) => {
            return () => state.search;
        },
        getTicketStatus: (state) => {
            return () => state.ticketStatus;
        }
    }
  });