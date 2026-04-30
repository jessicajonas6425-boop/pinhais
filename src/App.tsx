/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Tv, 
  Tv2, 
  Headphones, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight,
  MessageCircle,
  Menu,
  X,
  Phone,
  Star
} from 'lucide-react';
import { useState, useEffect, ReactNode, FormEvent } from 'react';

const WHATSAPP_NUMBER = "554192850194";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Quero o plano 500 Mega")}`;

// Official Logos - High resolution assets from Pinhais Telecom / PinhaisNet TV
const LOGO_URL = "https://i.postimg.cc/P5LtNJs0/2cb7fae04e63ba4d58377fc56c8084da.png";
const LOGO_WHITE = LOGO_URL;
const LOGO_COLOR = LOGO_URL;

const PLANS = [
  { mbps: "500", price: "119,90", color: "bg-brand-primary", highlighted: true },
  { mbps: "700", price: "129,90", color: "bg-brand-accent", highlighted: false },
  { mbps: "900", price: "149,90", color: "bg-brand-primary", highlighted: false },
];

const ENTERPRISE_FEATURES = [
  "Internet dedicada de alta capacidade",
  "Telefonia VOIP (ilimitada ou pré-paga)",
  "Transporte L2 e L3",
  "Colocation, CDN, IP fixo",
  "Conexão direta com IX-BR (100 Gbps)",
  "Suporte extremamente rápido"
];

const DIFFERENTIALS = [
  { title: "Fibra Óptica Pura", desc: "Tecnologia de ponta ponta-a-ponta." },
  { title: "CDN Otimizada", desc: "Melhor performance no Netflix, YouTube e Google." },
  { title: "IX-BR Direto", desc: "Conexão com os principais PTTs do Brasil." },
  { title: "Suporte Local", desc: "Equipe técnica própria em Pinhais." },
  { title: "Qualifica PinhaisNet", desc: "Cursos grátis (consulte planos)." },
  { title: "Equipamento", desc: "Roteadores em comodato inclusos." }
];

function WhatsAppMessage({ name, role, text, time }: { name: string; role: string; text: string; time: string }) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[280px] sm:max-w-[320px]">
      <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tl-none shadow-sm relative border border-black/5">
        <div className="text-[10px] font-bold text-emerald-700 uppercase mb-1 flex justify-between items-center">
          <span>{name} • {role}</span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">{text}</p>
        <div className="flex justify-end mt-1 items-center gap-1">
          <span className="text-[9px] text-slate-500">{time}</span>
          <div className="flex">
            <CheckCircle2 size={10} className="text-blue-500" />
            <CheckCircle2 size={10} className="text-blue-500 -ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: "Marcos Vinícius",
    role: "Vargem Grande / Pinhais",
    text: "Passando pra agradecer a instalação! Internet voando aqui no Vargem Grande. Finalmente uma fibra que não cai e entrega o que promete. 🚀",
    time: "09:42",
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Dra. Ana Paula",
    role: "Centro / Pinhais",
    text: "O suporte de vocês é nota 10! Atendimento humano e rápido pelo zap. A velocidade de 500 Mega está perfeita para o consultório. Obrigada!",
    time: "14:15",
    img: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Lucas Ferreira",
    role: "Maracanã / Colombo",
    text: "Instalaram hoje cedo aqui no Colombo. Ping baixíssimo pra jogar, recomendo demais! Atendimento local faz toda a diferença. 🎮✅",
    time: "18:50",
    img: "https://i.pravatar.cc/150?img=12"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userCep, setUserCep] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlanMbps, setSelectedPlanMbps] = useState<string | undefined>(undefined);

  const handleOpenWhatsApp = (planMbps?: string) => {
    setSelectedPlanMbps(planMbps);
    setIsFormOpen(true);
  };

  const handleCepSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleOpenWhatsApp();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const plan700 = PLANS[1];

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-white overflow-x-hidden">
      {/* Floating Elements */}
      <WhatsAppFloat onOpenForm={() => handleOpenWhatsApp()} />
      <SocialProofNotifications />
      <FloatingSalesBalloons />
      <StickyMobileCTA onOpenForm={() => handleOpenWhatsApp()} />

      {/* Lead Modal */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        planMbps={selectedPlanMbps} 
      />

      {/* Header */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-brand-border' : 'bg-transparent'}`}>
        {/* Urgency Bar inside fixed header */}
        <div className="bg-brand-accent text-white py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] w-full">
          Atenção: Promoção "Pinhais Conectada" expira em: <CountdownTimer />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-2' : 'py-5'}`}>
            <Logo color={scrolled ? "brand" : "white"} className="h-10 md:h-12" />
            
            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => handleOpenWhatsApp("500")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-bold text-xs transition-all ${scrolled ? 'border-brand-primary text-brand-primary' : 'border-white text-white'}`}
              >
                <Zap size={14} />
                ASSINAR NO WHATSAPP
              </button>
              <div className="bg-brand-accent text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 pulse-urgency cursor-pointer">
                <Zap size={14} />
                URGENTE: Instalação Grátis só até Sexta ou Últimas 7 vagas!
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#planos" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Planos</a>
              <a href="#beneficios" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Diferenciais</a>
              <a href="#empresas" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Empresas</a>
              <a href="#sobre" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Sobre</a>
              <button 
                onClick={() => handleOpenWhatsApp()}
                className="bg-brand-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg hover:brightness-110 transition-all"
              >
                ASSINAR AGORA
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-brand-text' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-32 px-6"
          >
            <div className="flex flex-col space-y-6 text-xl font-display font-semibold">
              <a href="#planos" onClick={() => setIsMenuOpen(false)}>Planos</a>
              <a href="#beneficios" onClick={() => setIsMenuOpen(false)}>Diferenciais</a>
              <a href="#empresas" onClick={() => setIsMenuOpen(false)}>Empresas</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <div className="bg-brand-accent/10 p-4 rounded-xl text-brand-accent text-sm font-bold flex items-center gap-2">
                <Zap size={18} />
                PROMOÇÃO: 20 VAGAS RESTANTES!
              </div>
              <button 
                onClick={() => { handleOpenWhatsApp(); setIsMenuOpen(false); }}
                className="bg-brand-primary text-white py-4 rounded-xl text-center shadow-xl flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                WhatsApp Vendas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section - High Performance Sales Focused */}
        <section className="relative bg-[#001D4A] overflow-hidden">
          {/* Animated Fiber Lines */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" className="w-full h-full">
              {[...Array(6)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${-100 + i * 200} 800 L ${400 + i * 150} -200`}
                  stroke="rgba(0, 150, 255, 0.4)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "linear"
                  }}
                />
              ))}
            </svg>
          </div>

          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=2070" 
              alt="Fiber Network" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-48 md:pb-20 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Copy */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-white text-center lg:text-left"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  <div className="inline-flex items-center gap-3 bg-brand-accent/30 border-2 border-brand-accent/50 px-6 py-3 rounded-full text-brand-accent text-base md:text-lg font-black uppercase tracking-tighter shadow-[0_0_30px_rgba(255,107,0,0.4)] animate-pulse">
                    <Zap size={22} className="fill-current" />
                    OFERTA EXCLUSIVA: PINHAIS / PIRAQUARA / CURITIBA / COLOMBO
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-white text-[10px] font-bold">4.9 no Google</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                  500 Mega <br />
                  R$ 119,90 <br />
                  <span className="text-brand-accent">Sem Fidelidade</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl font-medium">
                  Instalação em <span className="text-white font-bold">até 48 horas</span> e Roteador Wi-Fi 6 de última geração incluso. Suporte local humanizado.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <BenefitItem icon={<CheckCircle2 className="text-brand-accent" size={18} />} text="Sem Multa / Sem contrato" />
                  <BenefitItem icon={<CheckCircle2 className="text-brand-accent" size={18} />} text="Suporte Local Pinhais/Colombo" />
                  <BenefitItem icon={<CheckCircle2 className="text-brand-accent" size={18} />} text="Roteador Wi-Fi 6 Grátis" />
                </div>
              </motion.div>

              {/* Right Side: Sales Card with CEP field */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mx-auto lg:ml-auto w-full max-w-md"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-primary rounded-[2.5rem] blur opacity-30 animate-pulse" />
                <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="bg-brand-accent p-4 text-center">
                    <span className="text-white font-black text-xs uppercase tracking-[0.2em]">CONSULTE DISPONIBILIDADE AGORA</span>
                  </div>
                  <div className="p-8 text-center sm:p-10">
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-7xl md:text-8xl font-black text-[#001D4A] tracking-tighter">500</span>
                      <span className="text-2xl md:text-3xl font-black text-brand-primary uppercase">Mega</span>
                    </div>
                    <p className="text-slate-500 font-bold mb-6">A Melhor Fibra de Pinhais</p>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                      <div className="flex items-baseline justify-center gap-1 font-black text-[#001D4A]">
                        <span className="text-2xl">R$</span>
                        <span className="text-6xl tracking-tighter">119</span>
                        <span className="text-2xl">,90</span>
                        <span className="text-xl text-slate-400 font-bold ml-1">/mês</span>
                      </div>
                      <p className="text-[10px] text-brand-primary font-black uppercase mt-2 tracking-widest">+ INSTALAÇÃO GRÁTIS + NETFLIX</p>
                    </div>

                    <form onSubmit={handleCepSubmit} className="space-y-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Digite seu CEP" 
                          value={userCep}
                          onChange={(e) => setUserCep(e.target.value)}
                          className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-brand-primary outline-none font-bold text-center text-[#001D4A]"
                          maxLength={9}
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-green-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        ASSINAR AGORA
                        <ArrowRight size={24} />
                      </button>
                    </form>
                    <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      ⚡ Cobertura total em Pinhais-PR
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave Decor */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }} />
        </section>

        {/* Plans Grid - 4 Column Theme Style */}
        <section id="planos" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan) => (
                <div 
                  key={plan.mbps}
                  className={`bg-white border-2 rounded-2xl p-6 text-center transition-all flex flex-col relative ${plan.highlighted ? 'border-brand-primary shadow-xl scale-105 z-10' : 'border-brand-border shadow-sm'}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                      O MAIS PEDIDO
                    </div>
                  )}
                  
                  <div className="text-4xl font-extrabold text-brand-primary mb-1">{plan.mbps}MB</div>
                  <div className="text-xs text-slate-500 font-bold mb-4">Mensalidade</div>
                  <div className="text-3xl font-extrabold text-brand-text mb-6">R$ {plan.price}</div>

                  <div className="space-y-3 mb-8 pt-6 border-t border-slate-100 text-left">
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Sem Fidelidade ⚡" />
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Instalação em 48h" />
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Suporte Local Pinhais" />
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Netflix Incluso" />
                  </div>

                  <button 
                    onClick={() => handleOpenWhatsApp(plan.mbps)}
                    className={`w-full py-4 rounded-xl font-extrabold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${plan.highlighted ? 'bg-[#25D366] text-white' : 'bg-brand-primary text-white hover:brightness-110'}`}
                  >
                    <MessageCircle size={20} />
                    ASSINAR AGORA
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-brand-bg/50 border border-brand-border rounded-xl p-6 grid md:grid-cols-3 gap-6 text-sm text-slate-500 text-center">
              <div>
                <span className="font-bold text-brand-text">Equipamento:</span> Em comodato em todos os planos.
              </div>
              <div>
                <span className="font-bold text-brand-text">Instalação:</span> Rápida, geralmente em até 48h.
              </div>
              <div>
                <span className="font-bold text-brand-text">Destaque:</span> Planos 800MB com 100+ canais (consulte).
              </div>
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section id="beneficios" className="py-16 bg-brand-bg relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-brand-text">Por que escolher a <span className="text-brand-primary">PinhaisNet</span>?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {DIFFERENTIALS.map((diff, idx) => (
                <FeatureCard 
                  key={idx}
                  icon={<ShieldCheck size={20} className="text-brand-primary" />} 
                  title={diff.title} 
                  desc={diff.desc} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Solutions Section */}
        <section id="empresas" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                🚀 High Performance Business
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text">Soluções Corporativas</h2>
              <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">Internet de ultra performance para empresas que não podem parar.</p>
            </div>

            <div className="bg-brand-text rounded-[40px] overflow-hidden shadow-2xl relative border border-white/10">
              <div className="grid lg:grid-cols-2">
                {/* Information Side */}
                <div className="p-8 md:p-16 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-brand-primary font-black text-xl uppercase tracking-widest">Link Dedicado Empresarial</h3>
                    <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Tenha todo o poder de uma internet dedicada para sua empresa.</h4>
                    <p className="text-slate-400 text-lg">Infraestrutura robusta com 100% de garantia de banda e SLA de atendimento prioritário.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-primary/20 p-2 rounded-lg text-brand-primary mt-1">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Acesso Remoto Seguro</p>
                        <p className="text-[11px] text-slate-500">VPN e conexões seguras</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-primary/20 p-2 rounded-lg text-brand-primary mt-1">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Servidores Próprios</p>
                        <p className="text-[11px] text-slate-500">IP Fixo e estabilidade total</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-white">
                      <CheckCircle2 size={18} className="text-brand-primary mt-0.5" />
                      <span className="text-sm font-medium">Monitoramento de Câmeras</span>
                    </div>
                    <div className="flex items-start gap-3 text-white">
                      <CheckCircle2 size={18} className="text-brand-primary mt-0.5" />
                      <span className="text-sm font-medium">Suporte Local 24/7/365</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-brand-primary font-bold text-sm bg-brand-primary/10 w-fit px-4 py-2 rounded-lg">
                    <span>✅ Suporte Local</span>
                    <span className="opacity-30">|</span>
                    <span>✅ Converse com seu Gerente de Contas</span>
                  </div>
                </div>

                {/* Price/CTA Card Side */}
                <div className="relative bg-[#001D4A] p-8 md:p-16 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)] opacity-30" />
                  </div>
                  
                  <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 text-center shadow-3xl transform hover:scale-[1.02] transition-transform duration-500">
                    <div className="mb-6">
                      <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5 px-3 py-1 rounded-full">VÁLIDO PARA SUA EMPRESA</span>
                      <h5 className="text-5xl font-black text-brand-text mt-4 tracking-tighter">800 MEGA</h5>
                      <p className="text-brand-primary font-black uppercase text-xs tracking-widest mt-1">DEDICADO</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                      <span className="text-xs text-slate-500 font-bold uppercase block mb-2">Por apenas</span>
                      <div className="flex items-baseline justify-center gap-1 font-black text-brand-text">
                        <span className="text-xl">R$</span>
                        <span className="text-5xl tracking-tighter">899</span>
                        <span className="text-xl">,90</span>
                        <span className="text-lg text-slate-400 font-bold ml-1">/mês</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleOpenWhatsApp("Empresarial 800 Mega Dedicado")}
                      className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse"
                    >
                      <MessageCircle size={24} />
                      FALAR COM GERENTE
                    </button>
                    
                    <p className="mt-4 text-[10px] text-slate-400 font-bold">Consulte viabilidade técnica para seu CNPJ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 bg-brand-bg">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-4xl font-extrabold text-brand-text leading-tight">Sobre a Empresa</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Somos um provedor local de internet fibra óptica que oferece serviços de alta qualidade tanto para clientes residenciais quanto empresariais. Nosso objetivo é entregar velocidade real, estabilidade e um excelente atendimento na região de Pinhais e cidades vizinhas.
            </p>
            <div className="flex justify-center gap-8 border-t border-brand-border pt-8 mt-8">
              <div className="text-center">
                <div className="flex justify-center text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-2xl font-extrabold text-brand-primary">4.9/5</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Nota no Google</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-primary">1h</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Suporte Médio</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-primary">100%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Fibra Óptica</p>
              </div>
            </div>
          </div>
        </section>

        {/* Telephony Footer Promo (Theme Style) */}
        <section id="telefonia" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-brand-text text-white p-8 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-extrabold">Telefonia Fixa com Portabilidade</h2>
                <p className="text-slate-400">Traga seu número antigo sem custo adicional!</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-8 flex-wrap justify-center">
                <div>
                  <span className="text-[10px] uppercase font-bold opacity-60">A partir de</span>
                  <div className="text-3xl font-extrabold">R$ 29,90</div>
                </div>
                <button 
                  onClick={() => handleOpenWhatsApp("Telefonia Fixa")}
                  className="bg-white text-brand-text px-8 py-3 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all"
                >
                  Quero Telefone
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 space-y-2">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                <MessageCircle size={14} className="fill-current" />
                Satisfação Garantida
              </div>
              <h2 className="text-3xl font-extrabold text-brand-text">Clientes satisfeitos em <span className="text-brand-primary">Pinhais e Colombo</span></h2>
              <p className="text-slate-500">Veja o que dizem nos nossos grupos de suporte.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2 w-full max-w-[320px]">
                    <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full border border-slate-200" />
                    <span className="text-xs font-bold text-slate-500">{t.name}</span>
                  </div>
                  <WhatsAppMessage 
                    name={t.name}
                    role={t.role}
                    text={t.text}
                    time={t.time}
                  />
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <span className="font-black text-brand-text">4.9/5 Nota no Google</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-extrabold">A melhor conexão de Pinhais.</h2>
            <p className="text-slate-500">Ofertas válidas por tempo limitado ou enquanto durarem as 20 vagas.</p>
            <button 
              onClick={() => handleOpenWhatsApp()}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-12 py-5 rounded-xl font-extrabold text-xl shadow-2xl hover:brightness-110 transition-all"
            >
              <MessageCircle size={24} />
              ASSINAR AGORA PELO WHATSAPP
            </button>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-brand-border bg-white text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-left mb-12">
            <div className="col-span-1 space-y-4">
              <Logo color="brand" className="h-12" />
              <p className="text-sm leading-relaxed">
                Connectando Pinhais com a mais alta tecnologia de fibra óptica. Estabilidade e ultra velocidade para você.
              </p>
            </div>
            
            <div className="col-span-1 space-y-4">
              <h4 className="font-bold text-brand-text text-sm uppercase tracking-widest">Contatos Oficiais</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2"><Phone size={14} className="text-brand-primary" /> (41) 4042-7600</li>
                <li className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-brand-primary" /> 
                  <button onClick={() => handleOpenWhatsApp()} className="hover:text-brand-primary transition-colors underline decoration-brand-primary/30">(41) 99285-0194</button>
                </li>
                <li className="text-[11px]">callcenter@pinhaistelecom.com.br</li>
              </ul>
            </div>

            <div className="col-span-1 space-y-4">
              <h4 className="font-bold text-brand-text text-sm uppercase tracking-widest">Endereço</h4>
              <p className="text-sm leading-relaxed">
                R. Cassimiro de Abreu, 149<br />
                Vargem Grande, Pinhais - PR
              </p>
              <div className="pt-2">
                <h4 className="font-bold text-brand-text text-xs uppercase mb-1">Trabalhe Conosco</h4>
                <p className="text-[11px]">pinhaistelecom@pinhaistelecom.com.br</p>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <h4 className="font-bold text-brand-text text-sm uppercase tracking-widest">Atendimento</h4>
              <p className="text-sm">Segunda a Sábado<br />Suporte Rápido e Local</p>
              <div className="bg-[#25D366]/10 text-[#25D366] p-3 rounded-lg text-[11px] font-bold">
                ⚠️ Canal de Vendas Ativo: 20 Vagas Restantes hoje!
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-brand-border text-center text-[10px]">
             <p>© {new Date().getFullYear()} PinhaisNet TV - Provedor de Internet Fibra Óptica em Pinhais. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Logo({ color = "brand", className = "" }: { color?: "white" | "brand", className?: string }) {
  return (
    <div className={`transition-all duration-300 ${className} flex items-center`}>
      <img 
        src="https://i.postimg.cc/P5LtNJs0/2cb7fae04e63ba4d58377fc56c8084da.png" 
        alt="PinhaisNet Logo" 
        className={`h-full w-auto object-contain transition-all duration-300 ${color === 'white' ? 'brightness-0 invert' : ''}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

interface BenefitItemProps {
  key?: any;
  icon: ReactNode;
  text: string;
}

function BenefitItem({ icon, text }: BenefitItemProps) {
  return (
    <div className="flex items-center gap-2 text-slate-600 text-[13px] font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}

interface FeatureCardProps {
  key?: any;
  icon: ReactNode;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-brand-border flex items-start gap-4">
      <div className="p-2 rounded-lg bg-brand-accent/5">{icon}</div>
      <div>
        <h4 className="font-bold text-sm text-brand-text">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function LeadForm({ isOpen, onClose, planMbps }: { isOpen: boolean; onClose: () => void; planMbps?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const planText = planMbps ? `Plano de ${planMbps} Mega` : "Consulta de Disponibilidade";
    const message = `Olá! Me chamo ${name}. \nEmail: ${email} \nTelefone: ${phone} \nTenho interesse no ${planText}. Vi no site e quero aproveitar a oferta!`;
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
    onClose();
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-text/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-brand-text transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center sm:p-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-6">
            <Zap size={32} />
          </div>
          
          <h3 className="text-2xl font-extrabold text-brand-text mb-2">Quase lá!</h3>
          <p className="text-slate-500 mb-8">
            Preencha seus dados para garantirmos sua oferta exclusiva no WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Nome Completo</label>
              <input 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full bg-slate-50 border border-brand-border rounded-xl px-4 py-3 text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">E-mail</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: joao@email.com"
                className="w-full bg-slate-50 border border-brand-border rounded-xl px-4 py-3 text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">whatsapp / telefone</label>
              <input 
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(41) 99999-9999"
                className="w-full bg-slate-50 border border-brand-border rounded-xl px-4 py-3 text-brand-text focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-extrabold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              FALAR NO WHATSAPP
              <ArrowRight size={20} />
            </button>
            <p className="text-[10px] text-slate-400">Ao clicar, você será redirecionado para o nosso canal de vendas oficial.</p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function WhatsAppFloat({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-4">
      <AIAssistant onOpenForm={onOpenForm} />
      <motion.button
        onClick={onOpenForm}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="bg-[#25D366] text-white p-4 rounded-xl shadow-2xl pulse-urgency flex items-center justify-center gap-3 hover:brightness-110 transition-all font-bold text-sm"
      >
        <MessageCircle size={24} />
        <span>Falar com Vendas</span>
      </motion.button>
    </div>
  );
}

function AIAssistant({ onOpenForm }: { onOpenForm: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    "Olá! Sou a Inteligência Virtual da PinhaisNet. Posso te ajudar a escolher o melhor plano?",
    "🔥 EXTREMA URGÊNCIA: Só restam 7 vagas para a promoção de 500 Mega por R$ 119,90!",
    "Sabia que o plano de 500 Mega é o nosso campeão de vendas em Pinhais? Clique e garanta!",
    "⚡ INSTALAÇÃO EM 48H: Assine agora e tenha sua fibra instalada em tempo recorde!",
    "Centenas de pessoas em Pinhais e Colombo já mudaram para a PinhaisNet. Falta você!",
    "Quer um desconto exclusivo? Clique abaixo e peça o 'Cupom Site' para nosso consultor!"
  ];

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 2000);
    
    const messageInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-end gap-3 max-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.button
          key={messageIndex}
          onClick={onOpenForm}
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white border border-brand-primary p-4 rounded-2xl rounded-br-none shadow-xl relative cursor-pointer hover:bg-slate-50 transition-colors text-left"
        >
          <div className="absolute -bottom-2 -right-0 w-4 h-4 bg-white border-r border-b border-brand-primary rotate-45" />
          {isTyping ? (
            <div className="flex gap-1 py-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            </div>
          ) : (
            <p className="text-[13px] font-medium text-slate-700 leading-relaxed">
              {messages[messageIndex]}
            </p>
          )}
          {!isTyping && (
            <div className="mt-2 text-[10px] font-bold text-brand-primary flex items-center gap-1">
              CLIQUE PARA FALAR NO WHATSAPP <ArrowRight size={10} />
            </div>
          )}
        </motion.button>
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-full bg-white border-2 border-brand-primary shadow-lg p-1 overflow-hidden"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/6554/6554196.png" 
          alt="AI Assistant" 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ min: 14, sec: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { min: prev.min - 1, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-white inline-block w-16">
      {String(time.min).padStart(2, '0')}:{String(time.sec).padStart(2, '0')}
    </span>
  );
}

function SocialProofNotifications() {
  const [current, setCurrent] = useState<null | { name: string; city: string; plan: string }>(null);
  const data = [
    { name: "Carlos A.", city: "Vargem Grande", plan: "700MB + Netflix" },
    { name: "Maria Oliveira", city: "Emiliano Perneta", plan: "500MB" },
    { name: "Felipe S.", city: "Centro de Pinhais", plan: "900MB Extreme" },
    { name: "Ana P.", city: "Alto Tarumã", plan: "700MB + Netflix" },
    { name: "Betina L.", city: "Weissópolis", plan: "400MB Smart" },
    { name: "João Pedro", city: "Pineville", plan: "900MB Extreme" }
  ];

  useEffect(() => {
    const showNotification = () => {
      const random = data[Math.floor(Math.random() * data.length)];
      setCurrent(random);
      setTimeout(() => setCurrent(null), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 3000); // Initial show

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-6 left-6 z-[100] bg-white border-l-4 border-brand-primary p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-[300px]"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">ÚLTIMA ADESÃO EM PINHAIS</p>
            <p className="text-xs text-brand-text leading-tight">
              <span className="font-bold">{current.name}</span> de <span className="font-bold">{current.city}</span> acabou de contratar o plano <span className="text-brand-primary font-bold">{current.plan}</span>!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingSalesBalloons() {
  const balloons = [
    { text: "Netflix Grátis 🍿", top: "15%", left: "5%", delay: 0 },
    { text: "Instalação 48h ⚡", top: "45%", right: "5%", delay: 1 },
    { text: "Fibra 100% Pura 🌍", top: "75%", left: "8%", delay: 2 },
    { text: "Suporte Local 🎧", top: "30%", right: "8%", delay: 3 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden h-[4000px]">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: b.delay,
            ease: "easeInOut"
          }}
          style={{ 
            position: 'absolute', 
            top: b.top, 
            left: b.left, 
            right: b.right 
          }}
          className="bg-brand-primary/5 border border-brand-primary/10 px-4 py-2 rounded-full text-[10px] font-bold text-brand-primary/40 uppercase tracking-widest whitespace-nowrap"
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
}

function StickyMobileCTA({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-white/80 backdrop-blur-md border-t border-brand-border md:hidden">
      <button
        onClick={onOpenForm}
        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 animate-pulse"
      >
        <MessageCircle size={24} />
        ASSINAR NO WHATSAPP
      </button>
    </div>
  );
}



