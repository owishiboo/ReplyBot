import axios from 'axios';

const API = {
    GetChatbotResponse: async message => {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (message === "hi") resolve("Welcome to chatbot!");
          // else resolve("echo : " + message);
          else{
            axios({
              method: "GET",
              url:`http://localhost:5000/api/chat/${message}`,
              headers: {'Access-Control-Allow-Origin': '*', 'X-Requested-With': 'XMLHttpRequest'},
            })
            .then((response) => {
              const res =response.data
              console.log(response.data);
              // setReplyMessage(response.response);
              resolve(res.response)
            }).catch((error) => {
              if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                }
            })
          }
        }, 2000);
      });
    }
    
  };
  
  export default API;
  