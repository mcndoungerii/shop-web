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
            return instance.get('/branches/'+url)
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
            return instance.get('/branch/'+id)
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
            return instance.post('/branch', data)
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
            return instance.patch(`/branch/${data.id}`, data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    addSupplier (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/branch/addSupplier', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    deleteSupplier (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/branch/removeSupplier', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    addUser (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/branch/addUser', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    deleteUser (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/branch/removeUser', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    delete (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/branch/delete', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    
}
