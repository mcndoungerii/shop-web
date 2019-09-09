import {store} from '../store'


export default (to, from, next) => {
    console.log(localStorage.getItem("branch"));
  if (localStorage.getItem("branch")!=null) {
    //verify with firebase or jwt
      store.commit("clearError");
      store.commit("setProcessing", true);
      const branch = localStorage.getItem('branch')
      store.commit("setBranch", branch);
      store.commit("setProcessing", false);
    next()
    }else{
        localStorage.removeItem("branch")
        next('/user/branch/login')
    }
}