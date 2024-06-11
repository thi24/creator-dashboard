import { defineStore } from "pinia"
import { BookingSearch } from "~/classes/BookingSearch";
import { TicketStatus } from "~/classes/TicketStatus";

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
    },
    actions: {
        toggle(status: TicketStatus) {
            const exists = this.search.status.includes(status);
            if(exists) {
                this.search.status = this.search.status.filter(item => item !== status);
            } else {
                this.search.status.push(status);
            }
        }
    }
  });