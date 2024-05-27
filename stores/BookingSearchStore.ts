import { defineStore } from "pinia"
import { BookingSearch } from "~/classes/BookingSearch";
import { Event } from "~/classes/Event";
import { getEventById } from "~/requests/event";

export const useBookingSearchStore = defineStore('booking-search', {
    state: () => ({ 
        search: new BookingSearch()
    }),
    getters: {
        getSearch: (state) => {
            return () => state.search;
        }
    },
    actions: {
        
    }
  });