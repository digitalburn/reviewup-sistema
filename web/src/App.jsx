import { useState } from 'react'
import './App.css'

function App() {
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  async function enviarMensagem() {
    if (!telefone || !nome || !link) return alert('Por favor, preencha todos os campos!')
    
    setLoading(true)
    
    try {
      // Enviando para o motor na porta 3001
      const resposta = await fetch('http://127.0.0.1:3001/enviar-zap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: telefone,
          nome: nome,
          link: link
        })
      })

      const dados = await resposta.json()

      if (resposta.ok) {
        alert(`✅ Sucesso! Mensagem enviada para ${nome}!`)
        setTelefone('')
        setNome('')
      } else {
        alert('❌ Erro: ' + JSON.stringify(dados))
      }
    } catch (erro) {
      alert('⚠️ Erro de conexão. Verifique se o Motor (Janela Preta) está ligado!')
    }

    setLoading(false)
  }

  return (
    // Não mexemos no body aqui, o estilo vem do App.css
    <div className="card">
      <h1>🚀 ReviewUp</h1>
      <p>Gerenciador de Avaliações Inteligente</p>

      <div className="campo-grupo">
        <label>Nome do Cliente</label>
        <input 
          type="text" 
          placeholder="Ex: Andreia Silva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="campo-grupo">
        <label>WhatsApp (DDD + Número)</label>
        <input 
          type="text" 
          placeholder="Ex: 5511999998888"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <div className="campo-grupo">
        <label>Link de Avaliação (Google)</label>
        <input 
          type="text" 
          placeholder="Cole o link aqui..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <button className="btn-enviar" onClick={enviarMensagem} disabled={loading}>
        {loading ? 'Enviando...' : 'ENVIAR SOLICITAÇÃO ➤'}
      </button>
    </div>
  )
}

export default App