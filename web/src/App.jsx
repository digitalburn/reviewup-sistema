import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tela, setTela] = useState('landing')
  
  // Painel States
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  // 👇 ZAP DA ANDREIA PARA VENDAS 👇
  const whatsappVendas = "5511992514436"; 

  useEffect(() => {
    const linkSalvo = localStorage.getItem('reviewup_link')
    const senhaSalva = localStorage.getItem('reviewup_senha')
    if (linkSalvo) setLink(linkSalvo)
    if (senhaSalva) setSenha(senhaSalva)
  }, [])

  async function enviarMensagem() {
    if (!telefone || !nome || !link || !senha) return alert('Preencha todos os campos!')
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

  // --- LANDING PAGE PERSUASIVA ---
  if (tela === 'landing') {
    return (
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">🚀 ReviewUp <span className="beta">PRO</span></div>
          <button onClick={() => setTela('painel')} className="btn-outline">Área do Cliente</button>
        </nav>

        {/* HERO SECTION - Promessa Forte */}
        <header className="hero-section">
          <span className="tag-destaque">🔥 Estratégia usada pelos líderes de mercado</span>
          <h1>Não adianta ter o melhor serviço se <br /><span className="destaque-texto">ninguém te encontra.</span></h1>
          <p className="subtitle">
            Seu concorrente tem mais estrelas que você? O ReviewUp transforma seus clientes em fãs que te colocam no <strong>Topo do Google</strong> automaticamente pelo WhatsApp.
          </p>
          
          <div className="cta-group">
            <button 
              onClick={() => window.open(`https://wa.me/${whatsappVendas}?text=Quero%20dominar%20o%20Google%20com%20ReviewUp`, '_blank')} 
              className="btn-cta pulse"
            >
              QUERO VENDER MAIS ➤
            </button>
            <p className="small-text">🔒 Garantia de 7 dias • Instalação Imediata</p>
          </div>
        </header>

        {/* DOR E PROBLEMA (PNL) */}
        <section className="section-dark">
          <h2>Você está deixando dinheiro na mesa?</h2>
          <div className="grid-benefits">
            <div className="benefit-card">
              <h3>📉 Invisível no Mapa</h3>
              <p>Sem avaliações novas, o Google joga sua empresa para o final da fila. Clientes novos não te acham.</p>
            </div>
            <div className="benefit-card">
              <h3>😶 Vergonha de Pedir</h3>
              <p>É chato pedir avaliação na hora de pagar. Com o ReviewUp, nosso robô pede de forma educada e automática.</p>
            </div>
            <div className="benefit-card">
              <h3>⭐ Autoridade</h3>
              <p>Quem tem 4.9 estrelas vende mais caro e vende mais fácil. Reputação é dinheiro no bolso.</p>
            </div>
          </div>
        </section>

        {/* OFERTA IRRECUSÁVEL (Ancoragem) */}
        <section className="section-pricing">
          <div className="pricing-box">
            <div className="desconto-tag">OFERTA ANUAL (R$ 1,30 por dia)</div>
            <h3>Plano Business Anual</h3>
            <div className="price-container">
              <span className="riscado">De R$ 997</span>
              <span className="valor">R$ 500</span>
              <span className="periodo">/ano</span>
            </div>
            
            <ul className="check-list">
              <li>✅ <strong>Automação Total:</strong> Envie em 1 clique</li>
              <li>✅ <strong>WhatsApp Incluso:</strong> Sem custos extras</li>
              <li>✅ <strong>Suporte VIP:</strong> Ajuda humanizada</li>
              <li>🎁 <strong>Bônus:</strong> Análise do seu Perfil Google</li>
            </ul>

            <button 
              onClick={() => window.open(`https://wa.me/${whatsappVendas}?text=Quero%20aproveitar%20a%20oferta%20de%20500`, '_blank')} 
              className="btn-cta-full"
            >
              GARANTIR OFERTA AGORA
            </button>
            <p className="footer-price">Oferta válida para os primeiros 20 clientes.</p>
          </div>
        </section>

        <footer className="footer">
          <p>© 2025 ReviewUp. Feito para crescer o seu negócio.</p>
        </footer>
      </div>
    )
  }

  // --- PAINEL DO CLIENTE (Mantido igual) ---
  return (
    <div className="painel-container">
      <div className="card">
        <h2>🚀 Painel de Envio</h2>
        <p>Preencha os dados para disparar.</p>
        <div className="input-group">
          <label>Senha de Acesso</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Nome do Cliente</label>
          <input type="text" placeholder="Ex: João" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className="input-group">
          <label>WhatsApp</label>
          <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Link do Google</label>
          <input type="text" value={link} onChange={e => setLink(e.target.value)} />
        </div>
        <button className="btn-enviar" onClick={enviarMensagem} disabled={loading}>
          {loading ? 'Enviando...' : 'ENVIAR ZAP ➤'}
        </button>
        <button onClick={() => setTela('landing')} className="btn-voltar">Voltar</button>
      </div>
    </div>
  )
}

export default App