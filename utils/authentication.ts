import type { AxiosResponse } from "axios";
import axios from "axios";

export async function login() {
    axios.get<{redirectUrl: string}>("/api/login")
    .then((response: AxiosResponse) => {
        navigateTo(response.data.redirectUrl, { external: true });
    })
    .catch(() => {
        console.error("Failed to login");
    });
}
async function checkLogin() {
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const { data: token } = await useFetch('/api/token', { headers })
    console.log(token)
    if (token.value) {
        return true
    } else {
        return false
    }
}