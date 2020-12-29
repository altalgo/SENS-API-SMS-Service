const express = require('express');
const axios = require('axios');
const router = express.Router();
const crypto = require('crypto');

router.post('/send', (req, res) => {
  const {
    numberFrom: from,
    numberTo: to,
    formBody: content,
    subject,
  } = req.body;
  console.log(to);
  const arr = to.split('\r\n');
  const messages = arr.map((number) => {
    return {
      to: number,
      subject,
    };
  });
  console.log(messages);

  const timeStamp = Date.now().toString();
  const serviceId = process.env.SERVICE_ID;
  const accessKey = process.env.ACCESS_KEY_ID;
  const secretKey = process.env.ACCESS_SECRET_KEY;
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const url2 = `/sms/v2/services/${serviceId}/messages`;
  const StringtoSign = `POST ${url2}\n${timeStamp}\n${accessKey}`;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(StringtoSign)
    .digest('base64');
  const data = {
    type: 'LMS',
    countryCode: '82',
    from,
    content,
    messages,
  };

  axios({
    method: 'POST',
    url,
    headers: {
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': timeStamp,
      'x-ncp-apigw-signature-v2': signature,
    },
    data,
  })
    .then((response) => {
      console.log(response);
      res.redirect('/main');
    })
    .catch((err) => {
      console.log(err);
      res.send('Error');
    });
});

module.exports = router;
