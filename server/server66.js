
const ip = "http://localhost:8088/api/";

const api = {
  connectFetchController : async (path,method,body,callBack,errorCallBack) =>{
     return fetch(`${ip}${path}`, {
        credentials:'include',
        method: method,
        body:body?body:null,
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        if(callBack)
          callBack(data);
        return data;
      }).catch(function(e){
        if(errorCallBack)
          errorCallBack(e);
      });
    },
}

export default api;
