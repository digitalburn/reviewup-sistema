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

  const whatsappVendas = "5511992514436"; // ZAP DA ANDREIA

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

  // --- LANDING PAGE ---
  if (tela === 'landing') {
    return (
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">🚀 ReviewUp <span className="beta">PRO</span></div>
          <button onClick={() => setTela('painel')} className="btn-outline">Área do Cliente</button>
        </nav>

        {/* HERO */}
        <header className="hero-section">
          <span className="tag-destaque">🔥 O Segredo dos Negócios Locais de Sucesso</span>
          <h1>Não adianta ter o melhor serviço se <br /><span className="destaque-texto">ninguém te encontra.</span></h1>
          <p className="subtitle">
            Transforme clientes em fãs que te colocam no <strong>Topo do Google</strong> automaticamente pelo WhatsApp.
          </p>
          <div className="cta-group">
            <button 
              onClick={() => window.open(`https://wa.me/${whatsappVendas}?text=Quero%20dominar%20o%20Google%20com%20ReviewUp`, '_blank')} 
              className="btn-cta pulse"
            >
              QUERO VENDER MAIS ➤
            </button>
          </div>
        </header>

        {/* --- NOVA SEÇÃO: EXPLICAÇÃO COM PNL --- */}
        <section className="section-explain">
          <div className="explain-content">
            <h2>Imagine ter uma <span className="text-highlight">Recepcionista Virtual</span> que trabalha 24h por dia...</h2>
            <p className="explain-text">
              Você atende bem, o cliente sai feliz, mas <strong>a correria do dia a dia faz ele esquecer de te avaliar.</strong> 
              O ReviewUp elimina esse problema.
            </p>
            
            <div className="explain-grid">
              <div className="explain-item">
                <div className="big-number">1</div>
                <h4>Você Atende</h4>
                <p>Faça o seu trabalho excelente normalmente.</p>
              </div>
              <div className="explain-item">
                <div className="big-number">2</div>
                <h4>A Gente Lembra</h4>
                <p>Digite o número dele no sistema e nosso robô envia o pedido na hora.</p>
              </div>
              <div className="explain-item">
                <div className="big-number">3</div>
                <h4>O Google Sobe</h4>
                <p>O cliente avalia com 1 clique e sua nota dispara.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL (CELULAR) */}
        <section className="section-visual">
          <h2>Veja a mágica acontecendo no celular do cliente 📲</h2>
          <p className="visual-subtitle">É assim que ele recebe: personalizado, educado e impossível de ignorar.</p>
          
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="whatsapp-header">
                <div className="wa-avatar">🏪</div>
                <div className="wa-name">Sua Empresa <br/><span>online</span></div>
              </div>
              <div className="chat-container">
                <div className="message-bubble received">
                  Olá João! 👋 Obrigado pela preferência na Barbearia do Sérgio.<br/><br/>
                  Sua opinião é muito importante para nós. Poderia nos avaliar rapidinho?<br/><br/>
                  É só clicar aqui: <strong>👉 google.com/avaliar</strong>
                  <span className="time">10:30 ✓✓</span>
                </div>
                <div className="message-bubble sent">
                  Claro, vou avaliar agora! Adorei o serviço. ⭐⭐⭐⭐⭐
                  <span className="time">10:31 ✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREÇO */}
        <section className="section-pricing">
          <div className="pricing-box">
            <div className="desconto-tag">OFERTA ANUAL</div>
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

  // --- PAINEL ---
  return (
    <div className="painel-container">
      <div className="card">
        <h2>🚀 Painel de Envio</h2>
        <p>Preencha os dados para disparar.</p>
        <div className="input-group"><label>Senha de Acesso</label><input type="password" value={senha} onChange={e => setSenha(e.target.value)} /></div>
        <div className="input-group"><label>Nome do Cliente</label><input type="text" placeholder="Ex: João" value={nome} onChange={e => setNome(e.target.value)} /></div>
        <div className="input-group"><label>WhatsApp</label><input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} /></div>
        <div className="input-group"><label>Link do Google</label><input type="text" value={link} onChange={e => setLink(e.target.value)} /></div>
        <button className="btn-enviar" onClick={enviarMensagem} disabled={loading}>{loading ? 'Enviando...' : 'ENVIAR ZAP ➤'}</button>
        <button onClick={() => setTela('landing')} className="btn-voltar">Voltar</button>
      </div>
    </div>
  )
}

export default App