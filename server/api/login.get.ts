import { Keycloak, type KeycloakTokens } from "arctic";
import { generateCodeVerifier, generateState } from "arctic";

export default eventHandler(async (event) => {
    const realmURL = useRuntimeConfig().keycloakIssuer
    const clientId = useRuntimeConfig().keycloakId
    const clientSecret = useRuntimeConfig().keycloakSecret
    const redirectURI = useRuntimeConfig().authUrl // Add the appropriate redirect URI
    if (!realmURL || !clientId || !clientSecret || !redirectURI) { return }
    const keycloak = new Keycloak(realmURL, clientId, clientSecret, redirectURI);
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url: URL = await keycloak.createAuthorizationURL(state, codeVerifier, {
        // optional
        //scopes
    });

    // store state verifier as cookie
    setCookie(event, "state", state, {
        secure: true, // set to false in localhost
        path: "/",
        httpOnly: false,
        maxAge: 60 * 10 // 10 min
    });

    // store code verifier as cookie
    setCookie(event, "code_verifier", codeVerifier, {
        secure: true, // set to false in localhost
        path: "/",
        httpOnly: false,
        maxAge: 60 * 10 // 10 min
    });
    return {redirectUrl : url.toString()}
});