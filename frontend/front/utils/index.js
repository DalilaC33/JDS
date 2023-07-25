import AdminLayout from '../components/admin/layouts/adminLayout'
import DefaultLayout from '../components/admin/layouts/defaultLayout'
import Cookies from 'js-cookie'
import Axios from '../api-config/api'

const cookieName = 'nhande-y-auth'

/**
 * @description Obtiene la cookie con nombre nhande-y-auth y la retorna en formato JSON, en caso de no existir 
 * cookie retorna null 
 */
export const getCookie = () => {
    const myCookie = Cookies.get(cookieName)
    return myCookie? JSON.parse(myCookie) : null
}

/**
 * Crea una cookie con nombre nhande-y-auth con el contenido que obtiene por parámetro y lo guarda en el navegador 
 */
export const saveCookie = content => {
    Cookies.set(cookieName, JSON.stringify(content), {
        expires: 1,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    })
}

/**
 * Elimina la cookie con nombre nhande-y-auth del navegador 
 */
export const removeCookie = () => {
    Cookies.remove(cookieName)
}

/**
 * Obtiene el nombre del layout a utilizar definido al final de las páginas como la propiedad 'layout' y retorna el 
 * Layout al cual corresponde, si es que no se especificó un layout el retorno es el DefaultLayout 
 * (Ver en components/layout) 
 */
 export const getLayout = component => {
    const Layouts = { AdminLayout }
    return Layouts[component.layout] || DefaultLayout
}//Idea obtenida de https://simplernerd.com/nextjs-multiple-layouts/

const months = ["ene", "feb", "mar","abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export const formatDate = (date)=>{
    let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    return formatted_date
}

/**
 * Recupera el token de la cookie y la agrega a la instancia de Axios solo si este no tiene la autorización 
 */
export const retrieveJWT = () => {
    if(!Axios.defaults.headers.common['Authorization']) {
        const myCookie = getCookie()
        if(myCookie) Axios.defaults.headers.common['Authorization'] = `bearer ${myCookie}`
    }
}

/**
 * Elimina la propiedad Authorization de la instancia de Axios 
 */
export const removeJWT = () => {
    delete Axios.defaults.headers.common['Authorization']
}

/**
 * 
 * @param {*} date fecha a convertir en formato 'yyyy-mm-dd'
 * @param {*} daysToSubstract dias que se le restan a esa fecha
 * @returns 
 */
export const dateWithFormat = (date, daysToSubstract) => {
    const currentDate = date
    return new Date(currentDate.setDate(currentDate.getDate() - daysToSubstract)).toISOString().split('T')[0]
}

export const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }