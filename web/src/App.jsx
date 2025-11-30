import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  // 1. Assim que o site abre, tenta buscar o link salvo na memória
  useEffect(() => {
    const linkSalvo = localStorage.getItem('reviewup_link_google')
    if (linkSalvo) {
      setLink(linkSalvo)
    }
  }, [])

  async function enviarMensagem() {
    if (!telefone || !nome || !link) return alert('Por favor, preencha todos os campos!')
    
    // 2. Salva o link na memória do navegador para a próxima vez
    localStorage.setItem('reviewup_link_google', link)
    
    setLoading(true)
    
    try {
      // Usando o servidor da nuvem (Render)
      const resposta = await fetch('https://reviewup-sistema.onrender.com/enviar-zap', {
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
        // O link NÃO é apagado, ele continua lá para o próximo envio
      } else {
        alert('❌ Erro: ' + JSON.stringify(dados))
      }
    } catch (erro) {
      alert('⚠️ Erro de conexão. O servidor pode estar dormindo (aguarde 1 min e tente de novo).')
    }

    setLoading(false)
  }

  return (
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
          placeholder="Cole o link aqui (Ficará salvo!)"
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