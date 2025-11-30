import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estado que controla qual tela aparece ('landing' ou 'painel')
  const [tela, setTela] = useState('landing')
  
  // Estados do Painel (Dados do formulário)
  const [telefone, setTelefone] = useState('')
  const [nome, setNome] = useState('')
  const [link, setLink] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  // Link do WhatsApp da Andreia
  const whatsappVendas = "5511992514436"; 

  // Carrega dados salvos quando abre
  useEffect(() => {
    const linkSalvo = localStorage.getItem('reviewup_link')
    const senhaSalva = localStorage.getItem('reviewup_senha')
    if (linkSalvo) setLink(linkSalvo)
    if (senhaSalva) setSenha(senhaSalva)
  }, [])

  // Função que envia a mensagem para o Motor
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
    } catch (erro) { alert('⚠️ Erro de conexão. Verifique sua internet ou o servidor.') }
    setLoading(false)
  }

  // --- TELA 1: LANDING PAGE (O Site de Vendas) ---
  if (tela === 'landing') {
    return (
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">🚀 ReviewUp <span className="beta">PRO</span></div>
          {/* ESSE BOTÃO AQUI QUE FAZ A MÁGICA DE IR PRO PAINEL */}
          <button onClick={() => setTela('painel')} className="btn-outline">Área do Cliente</button>
        </nav>

        {/* HERO */}
        <header className="hero-section">
          <span className="tag-destaque">🔥 O Segredo dos Negócios Locais</span>
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

        {/* EXPLICAÇÃO CORRIGIDA */}
        <section className="section-explain">
          <div className="explain-content">
            <h2>Sua <span className="text-highlight">Recepcionista Virtual</span> 24h</h2>
            <p className="explain-text">Você atende, o cliente sai feliz, mas esquece de avaliar. Nós resolvemos isso.</p>
            
            <div className="explain-grid">
              <div className="explain-item">
                <div className="big-number">1</div>
                <h4>Você Atende</h4>
                <p>Faça seu trabalho excelente normalmente.</p>
              </div>
              
              <div className="explain-item">
                <div className="big-number">2</div>
                <h4>Disparo em 1 Clique</h4>
                <p>Você coloca o número e o robô envia a mensagem personalizada na hora.</p>
              </div>

              <div className="explain-item">
                <div className="big-number">3</div>
                <h4>O Google Sobe</h4>
                <p>O cliente avalia com um toque e sua nota dispara.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL CELULAR */}
        <section className="section-visual">
          <h2>Veja a mágica acontecendo 📲</h2>
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="whatsapp-header"><div className="wa-avatar">🏪</div><div className="wa-name">Sua Empresa <br/><span>online</span></div></div>
              <div className="chat-container">
                <div className="message-bubble received">Olá João! 👋 Obrigado pela preferência na Barbearia do Sérgio.<br/><br/>Sua opinião é muito importante para nós. Poderia nos avaliar rapidinho?<br/><br/>É só clicar aqui: <strong>👉 google.com/avaliar</strong><span className="time">10:30 ✓✓</span></div>
                <div className="message-bubble sent">Claro! ⭐⭐⭐⭐⭐<span className="time">10:31 ✓✓</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* PREÇOS */}
        <section className="section-pricing">
          <h2>Escolha o plano ideal para crescer</h2>
          
          <div className="pricing-grid">
            <div className="pricing-card basic">
              <h3>Mensal</h3>
              <div className="price-tag"><span className="currency">R$</span><span className="amount">97</span><span className="period">/mês</span></div>
              <p className="price-subtitle">Ideal para testar</p>
              <ul className="check-list">
                <li>✅ Envios Ilimitados</li>
                <li>✅ Painel de Gestão</li>
                <li>✅ Suporte no Zap</li>
                <li>❌ Sem Consultoria Google</li>
              </ul>
              <button onClick={() => window.open(`https://wa.me/${whatsappVendas}?text=Quero%20testar%20o%20Plano%20Mensal`, '_blank')} className="btn-cta-outline">QUERO MENSAL</button>
            </div>

            <div className="pricing-card featured">
              <div className="badge-promo">MAIS VENDIDO</div>
              <h3>Anual PRO</h3>
              <div className="price-tag"><span className="currency">R$</span><span className="amount">500</span><span className="period">/ano</span></div>
              <p className="price-subtitle">Economize R$ 664,00</p>
              <ul className="check-list">
                <li>✅ <strong>Tudo do Mensal</strong></li>
                <li>✅ Acesso por 12 meses</li>
                <li>✅ Prioridade no Suporte</li>
                <li>🎁 <strong>Bônus:</strong> Análise de Perfil Google</li>
              </ul>
              <button onClick={() => window.open(`https://wa.me/${whatsappVendas}?text=Quero%20a%20Oferta%20Anual`, '_blank')} className="btn-cta-full pulse">QUERO O ANUAL ➤</button>
            </div>
          </div>

          <div className="guarantee-box">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-text">
              <h4>Garantia Blindada de 7 Dias</h4>
              <p>Teste o ReviewUp por uma semana. Se você não gostar, nós devolvemos <strong>100% do seu dinheiro</strong>. O risco é todo nosso.</p>
            </div>
          </div>
        </section>

        <footer className="footer"><p>© 2025 ReviewUp. O parceiro do seu negócio.</p></footer>
      </div>
    )
  }

  // --- TELA 2: PAINEL DO CLIENTE ---
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
        
        {/* BOTÃO PARA VOLTAR PRO SITE */}
        <button onClick={() => setTela('landing')} className="btn-voltar">Voltar para Home</button>
      </div>
    </div>
  )
}

export default App