import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NuxtAuthHandler({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: '1d937e43aa86ad70c416',
           clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
})