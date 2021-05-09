const bodyParser=require('body-parser')

Post_req=(db,req,res)=>{
   
    if(req.body.Name && req.body.Roll){
        db.insertOne({
            Name:req.body.Name,
            Roll:req.body.Roll,
        })
        .then((result)=>{
            if(result.insertedCount==1){
            res.status(200).send('Inserted By Cluster process id'+process.pid)
            console.log(" Data Inserted By Custer porcess id"+process.pid)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else 
    {
        res.send('provide all field')
    }
}
Get_req=(db,req,res)=>{
    if(req.query.Roll){
        
        db.findOne({Roll:req.query.Roll})
        .then((result)=>{
            if(!result){
                
                res.send(JSON.stringify(result))
            }
            else{
             res.status(200).send('Get request Process with id: '+process.pid+"is :"+JSON.stringify(result))
             }
             console.log('Get request Process with id: '+process.pid+"is :"+JSON.stringify(result))
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else{
        res.status(202).send('send vailid data'+process.pid)
    }
}
module.exports.post_req=Post_req;
module.exports.get_req=Get_req;
