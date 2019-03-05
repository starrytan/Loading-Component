
const Mock=require('mockjs');

let db=Mock.mock({
    'data|50':[{
        id:'@id',
        name:'@name',
        'age|18-32':1
    }]
});

module.exports={
    [`GET /getdata`](req,res){
        setTimeout(()=>{
            res.status(200).json(db);
        },1000)
        
    },
}