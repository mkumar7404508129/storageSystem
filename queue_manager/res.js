

const axios=require('axios')
const { render } = require('ejs')
const redis=require('redis')
const client=redis.createClient({
    host:'127.0.0.1',
    port:6379
})

  
 module.exports.findVaulebyCache=(roll,callback)=>{
          
            client.get(roll,(err,reply)=>{
                if(err){
                    console.log("data not found Cache Error")
                    console.log(err)
                    return callback(err)
                }
               else if(reply){
                    console.log("data found in cache:-:"+ reply)
                    
                    res_data=JSON.stringify(reply)

                    callback("This Data found in cache: "+reply)
                }
                else{
                        var url="http://localhost:3030/Storage?Roll="+roll                    
                        axios.get(url)
                        .then(result=>{
                            if(result.data!=null){
                               
                                 client.set(roll,result.data)
                                console.log(result.data)
                                callback(result.data)
                            }
                            else{
                                callback("data not found")
                                console.log("data not found")
                            }
                            
                        })
                    .catch(err=>{
                            console.log(err+"\n"+"check please start server with port 3030")
                            callback(err)
                            })
                        }
                    })           
            }   
module.exports.updateValue=(body,callback)=>{
        axios.post("http://localhost:3030/Storage",body)
        .then(result=>{
                
                    callback(result.data)
        })
        .catch(err=>{
            console.log(err)
            callback(err)
         })
         
    }
