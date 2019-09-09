import axios from 'axios'
import { apiHost } from './config'
const config = {
    timeout: 60 * 2 * 1000,
    baseURL: apiHost
}
const instance = axios.create(config)

export default {

    list (url) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.get('/predefinedProducts/'+url)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    if (error.response && error.response.data) reject(error.response.data)
                    reject(error)
                })
        })
    },
    get (id) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.get('/predefinedProduct/'+id)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    if (error.response && error.response.data) reject(error.response.data)
                    reject(error)
                })
        })
    },
    create (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/predefinedProduct', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    edit (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/predefinedProduct/editing', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    update (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.patch(`/predefinedProduct/${data.id}`, data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    listCategories (url) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.get('/categories/'+url)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    if (error.response && error.response.data) reject(error.response.data)
                    reject(error)
                })
        })
    },
    createCategory (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/category', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },

}
