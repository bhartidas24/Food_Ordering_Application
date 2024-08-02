const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CreateUser = require('./Routes/CreateUser');
const DisplayData = require('./Routes/DisplayData');
const Auth = require('./Routes/Auth')
// const OrderData = require('./Routes/OrderData');
require('./DBconnect');
const { default: mongoose, Mongoose } = require('mongoose');
const { redirect } = require('react-router-dom');
const { default: axios, Axios } = require('axios');

const PORT = process.env.PORT || 5000


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());



app.use(CreateUser);
app.use(DisplayData);
// app.use(Auth);



const salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const merchant_id = 'PGTESTPAYUAT'
app.post('/payment', async(req,res)=>{
    console.log("payment is called")
    try {
        const {name,number,amount} = req.body;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId : 'T'+Date.now(),
            merchantUserId : 'MUID123'+Date.now(),
            name : name,
            amount : amount,
            redirectUrl : `/status`,
            redirectMode : "POST",
            mobileNumber : number,
            paymentInstruction:{
                type : "PAY_PAGE"
            }
        }
        const payload = JSON.stringify(data)
        const payloadMain = Buffer.from(payload).toString('base64');
        const key = salt_key;
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'
        
        const options ={
            method: 'POST',
            url : prod_URL,
            header:{
                accept : 'application/json',
                'Content-Type':'application/json',
                'X-VERIFY':checksum
            },
            data:{
                request:payloadMain
            }
        }
        Axios.request(options).then(function(response){
            return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function(error){
            console.log(error);
        })


    } catch (error) {
        console.log(error);
    }
})

app.post('/status', async(req,res)=>{
    const merchantTransactionId = req.body.merchantTransactionId
    const merchantId = req.body.merchantId
    const keyIndex = 1;
    const key = salt_key
    const string =`/pg/v1/status/${merchantId}/${merchantTransactionId}`+key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + "###" + keyIndex;
    const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`

    const options={
        method:'GET',
        url :URL,
        Headers:{
            accept:'application/json',
            'Content-Type':'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': merchantId
        }
    }

    Axios.request(options)
    .then(async(response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error);
    })
})

app.get('/home' , (req,res)=>{
    res.send("home fresh");
})
app.listen(PORT);