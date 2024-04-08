

export async function getAndParseToken() {
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const { data: token } = await useFetch('/api/token', { headers })
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