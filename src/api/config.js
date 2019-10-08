/* eslint-disable */
let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://duka.biliyako.com/api/v1'
} else {
    baseUrl = 'https://duka.biliyako.com/api/v1'
}
//'http://localhost:1337/api/v1
// https://baimu.biliyako.com/api/v1
export const apiHost = baseUrl
