import { NuxtAuthHandler } from '#auth';
import KeycloakProvider from "next-auth/providers/keycloak";

export default NuxtAuthHandler({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        KeycloakProvider.default({
            clientId: process.env.KEYCLOAK_ID,
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ]
})