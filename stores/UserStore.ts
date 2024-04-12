import { defineStore } from "pinia"


export const useUserStore = defineStore('user', {
    state: () => ({ 
        token: null as string | null
    }),
    getters: {
        getToken: (state) => {
            return () => state.token;
        },
    },
    actions: {
        setToken(token: string | null) {
            this.token = token;
          }
    }
    
  });