import { authOptions } from "./auth/[...]"
import { getServerSession, getServerToken } from "#auth"
import { decode } from '@auth/core/jwt'
import { defineEventHandler, H3Event, parseCookies, setCookie } from 'h3'


const runtimeConfig = useRuntimeConfig()
/** @type {import('@sveltejs/kit').Handle} */
export default defineEventHandler(async (event: H3Event) => {
  const session = await getServerSession(event, authOptions)
  const jwt = await getServerToken(event, authOptions)
  const cookies = parseCookies(event)
  const token = cookies?.['next-auth.session-token']
  const test = await decode({ token, secret: runtimeConfig.authJs.secret })
  //const token = (event as any).cookies.get('next-auth.session-token')
  return { test, token, session, jwt }
  if (token) (event as any).locals.tokenData = await decode({ token, secret: runtimeConfig.authJs.secret })
  console.log(session, jwt)
  return { token, session, jwt }
})