import { defineStore } from "pinia"
import { Event } from "~/classes/Event";
import { getEventById } from "~/requests/event";

export const useEventStore = defineStore('events', {
    state: () => ({ 
        event: undefined as Event | undefined
    }),
    getters: {
        getEvent: (state) => {
            return () => state.event;
        },
    },
    actions: {
        init(id: string) {
            this.event = undefined;
            getEventById(id, (event: Event) => {
                this.event = event;
            }, () => {});
        }
    }
  });