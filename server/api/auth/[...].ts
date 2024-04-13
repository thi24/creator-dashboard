import { OAuth2RequestError } from "arctic";
import { Keycloak, type KeycloakTokens } from "arctic";
import { useUserStore } from "~/stores/UserStore";

export default eventHandler(async (event) => {
    const query = getQuery(event);
    const code: string = query.code as string;
    const state = query.state;

    const storedState = getCookie(event, "state");
    const storedCodeVerifier = getCookie(event, "code_verifier");

    if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
        // 400
        throw new Error("Invalid request");
    }

    const realmURL = process.env.KEYCLOAK_ISSUER
    const clientId = process.env.KEYCLOAK_ID
    const clientSecret = process.env.KEYCLOAK_SECRET
    const redirectURI = process.env.AUTH_URL // Add the appropriate redirect URI
    if (!realmURL || !clientId || !clientSecret || !redirectURI) { return }
    const keycloak = new Keycloak(realmURL, clientId, clientSecret, redirectURI);

    try {
        const tokens: KeycloakTokens = await keycloak.validateAuthorizationCode(code, storedCodeVerifier) ;
        // store token as cookie
        setCookie(event, "token", tokens.accessToken, {
            secure: true, // set to false in localhost
            path: "/",
            httpOnly: false,
            maxAge: 60 * 10 // 10 min
        });
        // return { token: tokens.accessToken}
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            const { request, message, description } = e;
            // return { request: request, message: message, description: description}
        }
        // return { message: "Unknown error" }
    }
    if(process.env.AUTH_ORIGIN === undefined) {
        return { message: "AUTH_ORIGIN is not defined" }
    }
    sendRedirect(event, (process.env.AUTH_ORIGIN));
    
});