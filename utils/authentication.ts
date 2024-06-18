import axios, {AxiosError, type AxiosResponse} from "axios";

axios.interceptors.request.use((config) => {
    // Do not add Authorization header for login & request to PE
    const externalUrl = "https://engine.pe.benevolo.de/v1.0/messages/adminResponse1?execution_mode=synchronous"
    if (config.url !== "/api/login" && config.url !== externalUrl) {
        const token = requireToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("No valid token found");
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function login() {
    axios.get<{ redirectUrl: string }>("/api/login")
        .then((response: AxiosResponse) => {
            console.log(response.data.redirectUrl);
            navigateTo(response.data.redirectUrl, {external: true});
        })
        .catch(() => {
            console.error("Failed to login");
        });
}

async function checkLogin() {
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const {data: token} = await useFetch('/api/token', {headers})
    if (token.value) {
        return true
    } else {
        return false
    }
}

export function requireToken(): string {
    const token = useCookie('token')
    if (token.value != null) {
        return token.value
    }
    throw new Error();
}

export function relogIfTokenExpired(error: AxiosError) {
    if (error.response?.status == 403) {
        login()
    }
}