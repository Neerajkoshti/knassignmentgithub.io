const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const twilio = require('twilio');
const dotenv = require('dotenv').config();
const port = 8000
const app = express()
const jsonParser = bodyParser.json()
app.use(cors())
app.listen(port, () => console.log(`App is running on ${port}`))

app.post('/send-otp', jsonParser, (req, res) => {
    sendOtp(req.body.doc.number, req.body.doc.otp)
})

// Twilio integration

async function sendOtp(number, otp) {
    const accountSid = process.env.accountSid
    const authToken = process.env.authToken
    const client = await new twilio(accountSid, authToken);
    try {
        await client.messages
            .create({
                body: `Your OTP is ${otp}`,
                to: '+917773818396', // here number is hardcoded because twilio trail account cant send sms to unverified number.
                from: '+19788785062',
            })
            .then((message) => console.log(message.sid));
    } catch (error) {
        console.log(error)
    }
}