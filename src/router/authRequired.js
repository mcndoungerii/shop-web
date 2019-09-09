import {store} from '../store'
import axios from 'axios'
import { apiHost } from '../api/config'
const config = {
    timeout: 60 * 2 * 1000,
    baseURL: apiHost
}
const instance = axios.create(config)

export default (to, from, next) => {
  if (localStorage.getItem("user")!=null) {
    //verify with firebase or jwt
      store.commit("clearError");
      store.commit("setProcessing", true);
      const token = localStorage.getItem('token')
      Object.assign(instance.defaults, {headers: {Authorization: token}})
      instance.get('/user/me')
          .then((data) => {
              var user = data.data;
              if(user.role ==='CUSTOMER' || user.role ==='CUSTOMERADMIN'){
                if (localStorage.getItem("shop")!=null) {
                    //verify with firebase or jwt
                      store.commit("clearError");
                      store.commit("setProcessing", true);
                      const shop = localStorage.getItem('shop')
                      store.commit("setUser", {user:user});
                      store.commit("setShop", shop);
                      store.commit("setProcessing", false);
                    next()
                    }else{
                        localStorage.removeItem("shop")
                        next('/user/shop/login')
                    }
              }else if(user.role ==='ADMIN'){
                store.commit("setProcessing", false);
                next()
              }else{
                next('/user/nopermission');
              }

          }).catch((error) => {
              console.log(error)
          store.commit("setProcessing", false);
          next('/user/login');
      })

     next()
    }else{
        localStorage.removeItem("user")
        next('/user/login')
    }
}