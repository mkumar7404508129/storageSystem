const bee_queue=require('bee-queue')
const { json } = require('body-parser')


const req_queue=new bee_queue("request",{
    redis:{
        host: '127.0.0.1',
       port: 6379,
    },
    removeOnSuccess: true,
    removeOnFailure: true})
const res_queue=new bee_queue('response',{
    redis:{
        host: '127.0.0.1',
       port: 6379,
    },
    removeOnSuccess:false,
    removeOnFailure: false}
)

module.exports.add=(req,next)=>{
 
    const job=req_queue.createJob({
        method:req.method,
        query:req.query,
        body:req.body,
        param:req.params

    })
    job.timeout(3000)
   .retries(2)
   .save()
   next(4)
   

}

req_queue.process((job,done)=>{
    console.log(job.data)
   return  done(null,"job done")
})

   module.exports.resd=(callbck)=>{
       console.log("req processed")
       req_queue.on('job succeeded',(job,result)=>{
           console.log("this is succ")
           callbck(result)
           
       })
   } 