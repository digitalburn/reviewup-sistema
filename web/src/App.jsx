import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estado para controlar se mostra a Landing Page ou o Painel
  const [tela, setTela] = useState('landing') // 'landing' ou 'painel'
  
  // Estados do Painel
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  // Carregar dados salvos
  useEffect(() => {
    const linkSalvo = localStorage.getItem('reviewup_link')
    const senhaSalva = localStorage.getItem('reviewup_senha')
    if (linkSalvo) setLink(linkSalvo)
    if (senhaSalva) setSenha(senhaSalva)
  }, [])

  // Função de Enviar Zap
  async function enviarMensagem() {
    if (!telefone || !nome || !link || !senha) return alert('Preencha tudo!')
    
    setLoading(true)
    localStorage.setItem('reviewup_link', link)
    localStorage.setItem('reviewup_senha', senha)
    
    try {
      const resposta = await fetch('https://reviewup-sistema.onrender.com/enviar-zap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: telefone, nome, link, senha })
      })
      const dados = await resposta.json()

      if (resposta.ok) {
        alert(`✅ Sucesso! Mensagem enviada para ${nome}!`)
        setTelefone('')
        setNome('')
      } else {
        alert('❌ Erro: ' + (dados.error || 'Falha'))
      }
    } catch (erro) { alert('⚠️ Erro de conexão.') }
    setLoading(false)
  }

  // --- SE FOR LANDING PAGE ---
  if (tela === 'landing') {
    return (
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">🚀 ReviewUp</div>
          <button onClick={() => setTela('painel')} className="btn-login-nav">Área do Cliente</button>
        </nav>

        <header className="hero-section">
          <span className="tag">Sistema de Avaliações Automático</span>
          <h1>Domine o Google da<br /><span className="destaque">Sua Cidade</span></h1>
          <p className="subtitle">A ferramenta que envia mensagens automáticas no WhatsApp do seu cliente pedindo 5 estrelas.</p>
          
          {/* BOTÃO PARA O ZAP DA ANDREIA */}
          <button 
            onClick={() => window.open('https://wa.me/5511992514436?text=Quero%20o%20Plano%20de%20500', '_blank')} 
            className="btn-cta"
          >
            QUERO O PLANO ANUAL (R$ 500) ➤
          </button>
        </header>
      </div>
    )
  }

  // --- SE FOR PAINEL ---
  return (
    <div className="painel-container">
      <div className="card">
        <h2>🚀 Área do Cliente</h2>
        <p>Preencha para enviar a solicitação.</p>

        <div className="input-group">
          <label>Senha de Acesso</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Nome do Cliente</label>
          <input type="text" placeholder="Ex: Andreia" value={nome} onChange={e => setNome(e.target.value)} />
        </div>

        <div className="input-group">
          <label>WhatsApp (55+DDD+Num)</label>
          <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Link do Google</label>
          <input type="text" value={link} onChange={e => setLink(e.target.value)} />
        </div>

        <button className="btn-enviar" onClick={enviarMensagem} disabled={loading}>
          {loading ? 'Enviando...' : 'ENVIAR ZAP ➤'}
        </button>
        
        <button 
          onClick={() => setTela('landing')} 
          style={{background: 'none', border:'none', color: '#64748b', marginTop: '20px', cursor:'pointer'}}
        >
          Voltar para Home
        </button>
      </div>
    </div>
  )
}

export default App