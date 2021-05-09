const cluster=require('cluster')
const express=require('express')
const bodyParser=require('body-parser')
const { urlencoded } = require('body-parser')
const app=express()
const mongoClient=require('mongodb').MongoClient
const url='mongodb://127.0.0.1:27017'
const numCpu=require('os').cpus().length

const postMid=require('./middleWares')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

if(cluster.isMaster){
    console.log("master process %s is running",process.pid)
    for(var i=0;i<numCpu;i++){
        cluster.fork()
    }
   
    cluster.on('exit',(code,signal)=>{
        if(signal)
        console.log('worker was kill by %s',signal)
        else if(code !==0){
            console.log('worker exit with error %s',code)
        }
        else{
            console.log('worker sucess')
        }
    })
}
else{
    mongoClient.connect(url,{useUnifiedTopology: true})
    .then((client)=>{
        const db=client.db('Storage')
        const collection=db.collection('Hellow')
    
        app.get('/Storage',(req,res)=>{
         postMid.get_req(collection,req,res) 

        })
        app.post('/Storage',(req,res)=>{
          postMid.post_req(collection,req,res)
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
    app.listen(3030,()=>{
        console.log('Database server with port 3030 listen by process id '+process.pid)
        
    })
    

}
