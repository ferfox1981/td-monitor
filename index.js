const axios = require('axios');
const { exec } = require("child_process");
const https = require('https');



const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

instance.get('https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json').then(x => {
  let retorno = x.data.response['TrsrBdTradgList'].map(element =>
  ({
    dado: element['TrsrBd']
  })


  )
  let restrito = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB3E2')
  let taxa = restrito[0]['dado']['anulInvstmtRate'];
  exec('zenity --notification --window-icon="info" --text="Taxa Atual TD 2035: IPCA+"' + taxa, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});