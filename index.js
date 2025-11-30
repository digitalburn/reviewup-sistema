const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

// Rota de Disparo
app.get('/enviar-zap', async (req, res) => {
  
  // 👇👇👇 PREENCHA DIRETO AQUI (Sem arquivo .env) 👇👇👇
  const instanceId = '3EAED186AE04D1FF16041E15FDF75418'.trim();
  const token = 'E9F0EE0648441315B1D1013D'.trim();
  const clientToken = 'Fe7cd107a7daa4b25847e6ea656594571S'.trim();

  // Recebe o telefone do Site
  const telefoneDestino = req.body.phone;

  console.log(`Tentando enviar mensagem para: ${telefoneDestino}...`);

  try {
    const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;
    
    const resposta = await axios.post(
      url, 
      {
        phone: telefoneDestino,
        message: 'Olá! O Painel do ReviewUp enviou isso! 🚀'
      },
      { headers: { 'Client-Token': clientToken } }
    );

    console.log("SUCESSO NO ENVIO!");
    res.send({ id: resposta.data.messageId });
    
  } catch (error) {
    console.error("ERRO NO ENVIO:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ MOTOR ESTÁVEL RODANDO NA PORTA ${PORT}`);
  console.log(`(Pode ir no site e clicar no botão!)`);
});