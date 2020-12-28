const express = require('express');
const axios = require('axios');
const router = express.Router();
const crypto = require('crypto');

router.post('/send', (req, res) => {
  const timeStamp = Date.now().toString();
  const serviceId = process.env.SERVICE_ID;
  const accessKey = process.env.ACCESS_KEY_ID;
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const url2 = `/sms/v2/services/${serviceId}/messages`;
  const StringtoSign = `POST ${url2}\n${timeStamp}\n${accessKey}`;

  const signature = crypto.createHmac('sha256', StringtoSign).digest('base64');

  console.log(signature);

  const data = {
    ['type']: 'SMS',
    ['countryCode']: '82',
    ['from']: '01023250564',
    ['content']: `안녕하세요`,
    ['messages']: [
      {
        to: `01023250564`,
        subject: 'abcd',
        content: 'abcd',
      },
    ],
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
    .then((res) => {
      console.log(res);
      res.json({ succes: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ succes: false });
    });
});

module.exports = router;
