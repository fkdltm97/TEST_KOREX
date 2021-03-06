const ip = "http://localhost:8080/";

const api = {
    connectFetchController : async (path,method,body,callBack,errorCallBack) =>{
      console.log('connectFetchController호출:',path,method,body);
       return fetch(`${ip}${path}`, {
          credentials:'include',
          method: method,
          body:body?body:null,
          headers:{
            "Content-type" :"application/json"
          }
        }).then(function(res) {
          console.log('클라이언트 단 얻어낸 데이터:',res);
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