import axios, {AxiosError, type AxiosResponse} from "axios";

axios.interceptors.request.use((config) => {
    if (config.url !== "/api/login") {
        const token = requireToken();
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (!token) {
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function login() {
    axios.get<{ redirectUrl: string }>("/api/login")
        .then((response: AxiosResponse) => {
            navigateTo(response.data.redirectUrl, {external: true});
        })
        .catch(() => {
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