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
  Phone
} from 'lucide-react';
import { useState, useEffect, ReactNode, FormEvent } from 'react';

const WHATSAPP_NUMBER = "554192850194";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vi o site e quero aproveitar a promoção da Pinhais Net TV.`;

// Official Logos - High resolution assets from Pinhais Telecom / PinhaisNet TV
const LOGO_URL = "https://i.postimg.cc/P5LtNJs0/2cb7fae04e63ba4d58377fc56c8084da.png";
const LOGO_WHITE = LOGO_URL;
const LOGO_COLOR = LOGO_URL;

const PLANS = [
  { mbps: "400", price: "99,90", color: "bg-brand-primary", highlighted: false },
  { mbps: "500", price: "119,90", color: "bg-brand-primary", highlighted: false },
  { mbps: "700", price: "129,90", color: "bg-brand-accent", highlighted: true },
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

const TESTIMONIALS = [
  {
    name: "Ricardo Santos",
    role: "Home Office / Pinhais",
    text: "Internet voando! Melhor decisão que tomei pra trabalhar em casa. Estabilidade total e o suporte técnico realmente funciona.",
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Juliana Oliveira",
    role: "Dona de Casa",
    text: "A TV por aplicativo é sensacional, não trava nada e a Netflix grátis é um baita diferencial pra economizar no fim do mês.",
    img: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Marcos Silveira",
    role: "Gamer / Designer",
    text: "Latência baixa e 700 mega real. Consigo baixar jogos gigantes em minutos. Recomendo pra quem joga online!",
    img: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Ana Beatriz Lopes",
    role: "Professora",
    text: "Atendimento nota 10. Precisei de ajuda no sábado e me atenderam super rápido via WhatsApp. Provedor local é outra coisa!",
    img: "https://i.pravatar.cc/150?img=44"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<null | { mbps: string; price: string }>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 7000);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleOpenForm = (plan: { mbps: string; price: string }) => {
    setSelectedPlan(plan);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {showSplash && <IntroSplash />}
      </AnimatePresence>

      {/* Floating Elements */}
      <WhatsAppFloat onOpenForm={() => handleOpenForm(PLANS[2])} />
      <SocialProofNotifications />
      <FloatingSalesBalloons />
      <StickyMobileCTA onOpenForm={() => handleOpenForm(PLANS[2])} />

      {/* Lead Modal */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        plan={selectedPlan} 
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
            
            {/* Urgency Bubble (Theme specific) */}
            <div className="hidden lg:flex items-center">
              <div className="bg-brand-accent text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 pulse-urgency cursor-pointer">
                <Zap size={14} />
                SUPER PROMOÇÃO: 20 VAGAS DISPONÍVEIS!
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#planos" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Planos</a>
              <a href="#beneficios" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Diferenciais</a>
              <a href="#empresas" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Empresas</a>
              <a href="#sobre" className={`text-sm font-bold hover:text-brand-accent transition-colors ${scrolled ? 'text-brand-text' : 'text-white'}`}>Sobre</a>
              <a href={WHATSAPP_LINK} className="bg-brand-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg hover:brightness-110 transition-all">
                Falar Consultor
              </a>
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
              <a 
                href={WHATSAPP_LINK} 
                className="bg-brand-primary text-white py-4 rounded-xl text-center shadow-xl flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                WhatsApp Vendas
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section - Centered Clean Look */}
        <section className="relative pt-40 pb-20 overflow-hidden bg-brand-text">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2070" 
              alt="Fiber background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight tracking-tight">
                Ultra Velocidade <br />
                <span className="text-brand-primary">com Fibra Óptica</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                Planos completos com Netflix Grátis e TV por Aplicativo para toda a família em Pinhais.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button 
                  onClick={() => handleOpenForm(PLANS[2])}
                  className="bg-brand-primary text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  CONTRATAR AGORA
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
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
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Netflix Incluso" />
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="TV por Aplicativo" />
                    <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Wi-Fi Performance" />
                  </div>

                  <button 
                    onClick={() => handleOpenForm({ mbps: plan.mbps, price: plan.price })}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${plan.highlighted ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'bg-[#25D366] text-white'}`}
                  >
                    <MessageCircle size={16} />
                    Garantir Vaga Agora
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
        <section id="empresas" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-brand-text rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-xs">🏢 SOLUÇÕES CORPORATIVAS</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">Potencialize sua <span className="text-brand-primary">empresa</span></h2>
                <p className="text-slate-400">Infraestrutura robusta com conexão direta IX-BR e suporte especializado extremamente rápido em Pinhais.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ENTERPRISE_FEATURES.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      {feat}
                    </div>
                  ))}
                </div>
                <a href={WHATSAPP_LINK} className="inline-block bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all">
                  Consultar Soluções Business
                </a>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
                  alt="Modern Office" 
                  className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
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
              <div>
                <p className="text-2xl font-extrabold text-brand-primary">100Gbps+</p>
                <p className="text-xs text-slate-500 font-bold uppercase">Capacidade IX-BR</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-primary">48h</p>
                <p className="text-xs text-slate-500 font-bold uppercase">Instalação Média</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-primary">100%</p>
                <p className="text-xs text-slate-500 font-bold uppercase">Fibra Óptica</p>
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
                  onClick={() => handleOpenForm({ mbps: "Telefonia Fixa", price: "29,90" })}
                  className="bg-white text-brand-text px-8 py-3 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all"
                >
                  Quero Telefone
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-3xl font-extrabold text-brand-text">O que dizem nossos <span className="text-brand-primary">Clientes</span></h2>
              <p className="text-slate-500">Milhares de famílias conectadas em Pinhais.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-brand-bg/30 p-6 rounded-2xl border border-brand-border hover:shadow-lg transition-all">
                  <div className="flex gap-1 text-brand-accent mb-4">
                    {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={14} fill="currentColor" className="text-orange-400" />)}
                  </div>
                  <p className="text-sm text-slate-600 italic mb-6 text-brand-text">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary/20" />
                    <div>
                      <h4 className="font-bold text-brand-text text-sm">{t.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-extrabold">A melhor conexão de Pinhais.</h2>
            <p className="text-slate-500">Ofertas válidas por tempo limitado ou enquanto durarem as 20 vagas.</p>
            <button 
              onClick={() => handleOpenForm(PLANS[2])}
              className="inline-flex items-center gap-3 bg-brand-primary text-white px-12 py-5 rounded-xl font-extrabold text-xl shadow-2xl hover:brightness-110 transition-all"
            >
              Chamar no WhatsApp
              <ArrowRight />
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
                <li className="flex items-center gap-2"><MessageCircle size={14} className="text-brand-primary" /> (41) 99285-0194</li>
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

function Logo({ color = "white", className = "" }: { color?: "white" | "brand", className?: string }) {
  const [error, setError] = useState(false);
  
  if (error || !LOGO_URL) {
    return (
      <div className={`font-display font-extrabold tracking-tighter ${className} flex items-center ${color === 'white' ? 'text-white' : 'text-brand-primary'}`}>
        <span className="text-2xl">PINHAIS</span>
        <span className="text-brand-accent text-2xl">NET</span>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${className} flex items-center`}>
      <img 
        src={LOGO_URL} 
        alt="PinhaisNet TV Logo" 
        className={`h-full w-auto object-contain ${color === 'white' ? 'brightness-0 invert' : 'brightness-100'}`} 
        onError={() => setError(true)}
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
    "🔥 EXTREMA URGÊNCIA: Só restam 20 vagas para a promoção Netflix Grátis em Pinhais!",
    "Sabia que o plano de 700MB é o nosso recordista de vendas hoje? Clique e garanta sua vaga!",
    "⚡ INSTALAÇÃO EXPRESSA: Ligue agora e tenha sua fibra instalada em tempo recorde!",
    "Centenas de pessoas em Pinhais já mudaram para a PinhaisNet hoje. Faltas você!",
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
        className="w-full bg-brand-primary text-white py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 animate-pulse"
      >
        <Zap size={24} />
        GARANTIR MINHA VAGA AGORA!
      </button>
    </div>
  );
}
function IntroSplash() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: "brightness(2)" }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[200] bg-[#020617] flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Fiber Optic Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="w-full h-full opacity-80">
          {[...Array(32)].map((_, i) => (
            <g key={i}>
              <motion.path
                d={`M ${-200 + i * 60} 1300 Q ${400 + i * 40} ${600 - i * 10} ${1200 + i * 80} -300`}
                stroke="url(#hdFiberGradient)"
                strokeWidth={0.5 + Math.random() * 1.5}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ 
                  duration: 6 + Math.random() * 4, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              />
              {/* Data Pulse Heads */}
              <motion.circle
                r="1.5"
                fill="#fff"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "linear"
                }}
                style={{ 
                  offsetPath: `path('M ${-200 + i * 60} 1300 Q ${400 + i * 40} ${600 - i * 10} ${1200 + i * 80} -300')`,
                  filter: 'blur(1px) drop-shadow(0 0 5px #fff)'
                }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="hdFiberGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-[800px] h-[800px] bg-blue-500/10 blur-[160px] rounded-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: 30, opacity: 0, filter: "blur(15px) brightness(2)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px) brightness(1)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          {/* HD Vector Logo Implemenation for Splash */}
          <div className="absolute inset-0 bg-brand-primary/20 blur-[80px] rounded-full" />
          
          <div className="flex items-baseline gap-1 relative z-10 scale-125 md:scale-150 py-10">
            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              PINHAIS
              <span className="text-brand-accent italic ml-1">NET</span>
            </span>
            <div className="h-4 w-4 rounded-full bg-brand-primary animate-pulse shadow-[0_0_15px_#0062FF]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="h-[2px] w-64 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#38bdf8]"
            />
          </div>
          <motion.span 
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-[13px] font-black text-white uppercase tracking-[0.7em] drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] text-center pl-2"
          >
            Conectando você ao mundo
          </motion.span>
        </motion.div>
      </div>

      <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
    </motion.div>
  );
}

function LeadForm({ isOpen, onClose, plan }: { isOpen: boolean; onClose: () => void; plan: { mbps: string; price: string } | null }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen || !plan) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = `Olá! Me chamo ${name} (Telefone: ${phone}). Tenho interesse no Plano de ${plan.mbps}MB por R$ ${plan.price}. Vi no site e quero aproveitar a promoção!`;
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
    onClose();
    setName("");
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
            Preencha seus dados para garantirmos o plano de <span className="text-brand-primary font-bold">{plan.mbps}MB</span> para você no WhatsApp.
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
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-extrabold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              FALAR COM VENDAS
              <ArrowRight size={20} />
            </button>
            <p className="text-[10px] text-slate-400">Ao clicar, você será redirecionado para o nosso canal de vendas oficial.</p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
