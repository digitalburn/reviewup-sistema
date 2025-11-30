const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/disparar', async (req, res) => {
  
  // 1. ID DA INSTÂNCIA (Cuidado para não ter espaços!)
  const instanceId = '3EAED186AE04D1FF16041E15FDF75418'.trim();

  // 2. TOKEN DA INSTÂNCIA (Cuidado para não ter espaços!)
  const instanceToken = 'E9F0EE0648441315B1D1013D'.trim();

  // 3. CLIENT TOKEN (O NOVO DA ABA SEGURANÇA!)
  const clientToken = 'Fe7cd107a7daa4b25847e6ea656594571S'.trim();

  // 4. SEU CELULAR
  const telefoneDestino = '5511982113231'; 

  try {
    // URL PADRÃO
    const url = `https://api.z-api.io/instances/${instanceId}/token/${instanceToken}/send-text`;
    
    console.log("---------------------------------------------------");
    console.log("ENVIANDO COM SEGURANÇA MÁXIMA (CLIENT TOKEN)...");
    console.log("URL:", url);
    console.log("---------------------------------------------------");

    const resposta = await axios.post(
      url, 
      {
        phone: telefoneDestino,
        message: 'FUNCIONOU! O ReviewUp venceu a Z-API! 🚀'
      },
      {
        headers: {
          'Client-Token': clientToken
        }
      }
    );

    console.log("SUCESSO! RESPOSTA:", resposta.data);
    res.send(`SUCESSO! ID: ${resposta.data.messageId}`);
    
  } catch (error) {
    console.error("ERRO:", error.response ? error.response.data : error.message);
    const motivo = error.response ? JSON.stringify(error.response.data) : error.message;
    res.send(`ERRO: ${motivo}`);
  }
});

app.listen(4000, () => {
  console.log('SERVIDOR BLINDADO RODANDO NA PORTA 4000 🛡️');
});