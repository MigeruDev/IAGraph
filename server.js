const express= require('express'),
        path = require('path');

const app = express();

app.use(express.static('./dist/material-dashboard-angular'));

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/material-dashboard-angular/index.html'))
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log('Served Started')
})