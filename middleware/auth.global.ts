export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie("token");
    if(to.fullPath !== '/' && cookie.value == null) {
        //return navigateTo('/');
    }
    if(to.fullPath === '/' && cookie.value != null) {
        //return navigateTo('/veranstaltungen');
    }
});