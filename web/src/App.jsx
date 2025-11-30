import React from 'react';
import './App.css';

export default function Landing({ onLogin }) {
  // 👇 ZAP DA ANDREIA 👇
  const whatsappVendas = "5511992514436"; 

  const irParaZapMensal = () => {
    const texto = "Olá! Quero testar o ReviewUp no Plano Mensal de R$ 97.";
    window.open(`https://wa.me/${whatsappVendas}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const irParaZapAnual = () => {
    const texto = "Olá! Quero aproveitar a OFERTA ANUAL de R$ 500 do ReviewUp.";
    window.open(`https://wa.me/${whatsappVendas}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">🚀 ReviewUp <span className="beta">PRO</span></div>
        <button onClick={onLogin} className="btn-login-nav">Área do Cliente</button>
      </nav>

      <header className="hero-section">
        <span className="tag-destaque">🔥 O Segredo dos Negócios Locais</span>
        <h1>Não adianta ter o melhor serviço se <br /><span className="destaque-texto">ninguém te encontra.</span></h1>
        <p className="subtitle">Transforme clientes em fãs que te colocam no <strong>Topo do Google</strong> automaticamente pelo WhatsApp.</p>
        <div className="cta-group">
          <button onClick={irParaZapAnual} className="btn-cta pulse">QUERO VENDER MAIS ➤</button>
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
            
            {/* --- MUDANÇA AQUI --- */}
            <div className="explain-item">
              <div className="big-number">2</div>
              <h4>Disparo em 1 Clique</h4>
              <p>Você coloca o número e o robô envia a mensagem personalizada na hora.</p>
            </div>
            {/* ------------------- */}

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
              <div className="message-bubble received">Olá João! 👋 Obrigado pela preferência. Poderia nos avaliar?<br/><br/>É só clicar: <strong>👉 google.com/avaliar</strong><span className="time">10:30 ✓✓</span></div>
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
            <button onClick={irParaZapMensal} className="btn-cta-outline">QUERO MENSAL</button>
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
            <button onClick={irParaZapAnual} className="btn-cta-full pulse">QUERO O ANUAL ➤</button>
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
  );
}