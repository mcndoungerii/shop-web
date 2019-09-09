import {store} from '../store'


export default (to, from, next) => {
    console.log(localStorage.getItem("shop"));
  if (localStorage.getItem("shop")!=null) {
    //verify with firebase or jwt
      store.commit("clearError");
      store.commit("setProcessing", true);
      const shop = localStorage.getItem('shop')
      store.commit("setShop", shop);
      store.commit("setProcessing", false);
    next()
    }else{
        localStorage.removeItem("shop")
        next('/user/shop/login')
    }
}