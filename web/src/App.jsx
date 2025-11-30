import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [senha, setSenha] = useState('') // Campo novo
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const linkSalvo = localStorage.getItem('reviewup_link')
    const senhaSalva = localStorage.getItem('reviewup_senha')
    if (linkSalvo) setLink(linkSalvo)
    if (senhaSalva) setSenha(senhaSalva)
  }, [])

  async function enviarMensagem() {
    if (!telefone || !nome || !link || !senha) return alert('Preencha tudo, inclusive a SENHA!')
    
    setLoading(true)
    localStorage.setItem('reviewup_link', link)
    localStorage.setItem('reviewup_senha', senha)
    
    try {
      // Manda para o servidor na nuvem
      const resposta = await fetch('https://reviewup-sistema.onrender.com/enviar-zap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: telefone, 
          nome, 
          link, 
          senha // Envia a senha junto
        })
      })

      const dados = await resposta.json()

      if (resposta.ok) {
        alert(`✅ Sucesso! Mensagem enviada para ${nome}!`)
        setTelefone('')
        setNome('')
      } else {
        alert('❌ Erro: ' + (dados.error || 'Falha no envio'))
      }
    } catch (erro) {
      alert('⚠️ Erro de conexão. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h1>🚀 ReviewUp</h1>
      <p>Área do Cliente</p>

      <div className="campo-grupo">
        <label>Senha de Acesso</label>
        <input type="password" placeholder="Senha da Loja" value={senha} onChange={e => setSenha(e.target.value)} />
      </div>

      <div className="campo-grupo">
        <label>Nome do Cliente</label>
        <input type="text" placeholder="Ex: Andreia" value={nome} onChange={e => setNome(e.target.value)} />
      </div>

      <div className="campo-grupo">
        <label>WhatsApp</label>
        <input type="text" placeholder="Ex: 5511999998888" value={telefone} onChange={e => setTelefone(e.target.value)} />
      </div>

      <div className="campo-grupo">
        <label>Link de Avaliação</label>
        <input type="text" placeholder="Cole o link aqui..." value={link} onChange={e => setLink(e.target.value)} />
      </div>

      <button className="btn-enviar" onClick={enviarMensagem} disabled={loading}>
        {loading ? 'Verificando...' : 'ENVIAR ➤'}
      </button>
    </div>
  )
}

export default App