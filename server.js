const express = require('express');
const app = express();
const cors = require('cors');
const pdf = require('html-pdf');

const pdfTemplate = require('./documents/emissions');
const pdfChroniqueurs = require('./documents/chroniqueurs');


const port = process.env.PORT || 5000 ; 

app.use(cors());
app.use(express.json());


app.post('/create-pdf', (req, res) => {  
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})



app.post('/createpdf', (req, res) => {  
    console.log(req.body);
    
    pdf.create(pdfChroniqueurs(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetchpdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

const emissionsRouter = require('./routes/emissions');
const chroniqueursRouter = require('./routes/chroniqueurs');

app.use('/emissions' , emissionsRouter);
app.use('/chroniqueurs' , chroniqueursRouter);

app.listen(5000 , ()=>{
    console.log(`Server is running on port : ${port} `)    
});