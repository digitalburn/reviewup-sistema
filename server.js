require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const supabase = require('./supabaseClient');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/enviar-zap', async (req, res) => {
  
  // 1. SEGURANÇA: Verifica a senha
  const senhaDigitada = req.body.senha;
  // Se não tiver senha configurada no Render, usa VIP2025 como padrão
  const senhaCorreta = process.env.SENHA_MESTRA || 'VIP2025';

  if (senhaDigitada !== senhaCorreta) {
    return res.status(401).send({ error: 'Senha incorreta! Fale com o suporte.' });
  }

  // 👇 SEUS DADOS DA Z-API 👇
  const instanceId = '3EAED186AE04D1FF16041E15FDF75418'.trim();
  const token = 'E9F0EE0648441315B1D1013D'.trim();
  const clientToken = 'Fe7cd107a7daa4b25847e6ea656594571S'.trim();

  const { phone, nome, link } = req.body;

  try {
    const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;
    const mensagem = `Olá ${nome}! 👋 Obrigado pela preferência.\n\nSua opinião é muito importante para nós. Poderia nos avaliar?\n\nÉ só clicar aqui: ${link}`;
    
    const resposta = await axios.post(
      url, 
      { phone, message: mensagem },
      { headers: { 'Client-Token': clientToken } }
    );

    const idZap = resposta.data.messageId;
    
    // Salva no banco
    await supabase.from('disparos').insert([{ 
      telefone: phone, 
      status: 'enviado', 
      zapi_id: idZap 
    }]);

    res.send({ id: idZap });
    
  } catch (error) {
    console.error("ERRO:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ MOTOR SEGURO RODANDO NA PORTA ${PORT}`);
});