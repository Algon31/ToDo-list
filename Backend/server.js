const express = require('express');
const app = express();

const PORT = 5000;

app.get('/',(req,res) =>{
    return res.json({message : "heyy from docker container"})
})

app.get('/g', (req,res)=>{
    return res.json({
        message : "this is updated one"
    })
})

app.listen(PORT,()=>{
    console.log("listening to port :", PORT)
})