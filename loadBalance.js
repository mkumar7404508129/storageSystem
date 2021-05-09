const express=require('express')
const http=require('http')
const bodyParser=require('body-parser')


const app=express()
const PORT=process.env.PORT||4040
//const req_queue=require('./queue_manager/req_queue')
const res_queue=require('./queue_manager/res')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('index.ejs',{data:"",post:""})
})

app.get('/getRoll',(req,res)=>{
    res_queue.findVaulebyCache(req.query.Roll,callback=>{
        res.render('index.ejs',{data:callback,post:""})
    })   
})
app.post('/post',(req,res)=>{
    console.log(req.body)
    res_queue.updateValue(req.body,callback=>{
        console.log(callback)
        res.render('index.ejs',{data:"",post:callback})
    })

})
const server=http.createServer(app)

server.listen(PORT,()=>{
    console.log("I am LoadBalancer with PORT:"+PORT+
    "\nI will Send request to Queue Manager"+
    "\nI will take response from Queue Manger And Send to User"+
    "\nI have a cache Memory that take record of frequently requested data")
})