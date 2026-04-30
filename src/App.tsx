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

const BUSINESS_PLANS = [
  { 
    title: "Link Dedicado", 
    mbps: "800", 
    price: "899,90", 
    features: ["100% Full Duplex", "IP Válido Fixo", "SLA 99.9%", "Gerente de Contas"],
    highlighted: true 
  },
  { 
    title: "Transporte PTT", 
    mbps: "Gigabit", 
    price: "Sob Consulta", 
    features: ["PTT-PR ↔ PTT-SP", "Baixíssima Latência", "Alta Disponibilidade", "Segurança Garantida"],
    highlighted: false 
  },
  { 
    title: "Porta PON", 
    mbps: "Gpon", 
    price: "Sob Consulta", 
    features: ["Rede Neutra", "Sem CAPEX", "Escalabilidade Imediata", "Suporte 24/7"],
    highlighted: false 
  },
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

const BUSINESS_TESTIMONIALS = [
  {
    name: "Roberto Almeida",
    role: "CEO - Tech Solutions (Pinhais)",
    text: "O Link Dedicado da PinhaisNet mudou nosso patamar aqui no centro de Pinhais. SLA cumprido à risca e latência perfeita para nossos servidores.",
    time: "10:30",
    img: "https://i.pravatar.cc/150?img=59"
  },
  {
    name: "Cláudia Souza",
    role: "Gerente de TI - Logística Colombo",
    text: "O transporte PTT facilitou nossa comunicação entre matriz em Colombo e filial. Estabilidade que nunca tivemos com grandes operadoras.",
    time: "15:20",
    img: "https://i.pravatar.cc/150?img=47"
  },
  {
    name: "Sérgio Mendes",
    role: "Provedor Local - Pinhais/Piraquara",
    text: "Alugamos porta PON com a PinhaisNet em Pinhais e a escalabilidade é fantástica. Conseguimos crescer nossa base rapidamente.",
    time: "11:45",
    img: "https://i.pravatar.cc/150?img=68"
  }
];

export default function App() {
  const [view, setView] = useState<'splash' | 'residential' | 'business'>('splash');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userCep, setUserCep] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlanMbps, setSelectedPlanMbps] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => {
        setView('residential');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [view]);

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

  if (view === 'splash') {
    return <SplashScreen onChoice={(choice) => setView(choice)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col selection:bg-brand-accent selection:text-white overflow-x-hidden ${view === 'business' ? 'bg-[#001D4A]' : 'bg-white'}`}>
      {/* Floating Elements */}
      <WhatsAppFloat onOpenForm={() => handleOpenWhatsApp()} isBusiness={view === 'business'} />
      <SocialProofNotifications isBusiness={view === 'business'} />
      <FloatingSalesBalloons isBusiness={view === 'business'} />
      <StickyMobileCTA onOpenForm={() => handleOpenWhatsApp()} />

      {/* Lead Modal */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        planMbps={selectedPlanMbps} 
      />

      {/* Header */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-brand-border' : 'bg-transparent'}`}>
        {/* Urgency Bar */}
        <div className="bg-brand-accent text-white py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] w-full px-4">
          Atenção: Promoção "{view === 'business' ? 'Business Ultra' : 'Pinhais Conectada'}" expira em: <CountdownTimer />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-2' : 'py-5'}`}>
            <button onClick={() => setView('splash')} className="hover:scale-105 transition-transform">
              <Logo color={scrolled ? "brand" : "white"} className="h-10 md:h-12" />
            </button>
            
            {/* Nav Switcher - Desktop */}
            <div className="hidden lg:flex items-center bg-black/10 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setView('residential')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${view === 'residential' ? 'bg-brand-primary text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Residencial
              </button>
              <button 
                onClick={() => setView('business')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${view === 'business' ? 'bg-brand-primary text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
              >
                Empresarial
              </button>
            </div>

            {/* Nav Switcher - Mobile (Always visible) */}
            <div className="flex lg:hidden items-center bg-black/10 backdrop-blur-md rounded-full p-0.5 border border-white/10 ml-2">
              <button 
                onClick={() => setView('residential')}
                className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-tight transition-all ${view === 'residential' ? 'bg-brand-primary text-white shadow-md' : 'text-white/60'}`}
              >
                Res
              </button>
              <button 
                onClick={() => setView('business')}
                className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-tight transition-all ${view === 'business' ? 'bg-brand-primary text-white shadow-md' : 'text-white/60'}`}
              >
                Bus
              </button>
            </div>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center space-x-6 ${scrolled ? 'text-brand-text' : 'text-white'}`}>
              <a href="#planos" className="text-sm font-bold hover:text-brand-accent transition-colors">Planos</a>
              <a href="#beneficios" className="text-sm font-bold hover:text-brand-accent transition-colors">Diferenciais</a>
              {view === 'residential' ? (
                <button onClick={() => setView('business')} className="text-sm font-bold hover:text-brand-accent transition-colors text-brand-primary">Para Empresas</button>
              ) : (
                <button onClick={() => setView('residential')} className="text-sm font-bold hover:text-brand-accent transition-colors text-brand-primary">Para Residência</button>
              )}
              <a href="#sobre" className="text-sm font-bold hover:text-brand-accent transition-colors">Sobre</a>
              <button 
                onClick={() => handleOpenWhatsApp()}
                className="bg-brand-primary text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg hover:brightness-110 transition-all"
              >
                {view === 'business' ? 'ASSINAR LINK' : 'ASSINAR AGORA'}
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
              <div className="flex items-center bg-slate-100 rounded-2xl p-1 mb-4">
                <button 
                  onClick={() => { setView('residential'); setIsMenuOpen(false); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'residential' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}
                >
                  Residencial
                </button>
                <button 
                  onClick={() => { setView('business'); setIsMenuOpen(false); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'business' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400'}`}
                >
                  Empresarial
                </button>
              </div>
              <a href="#planos" onClick={() => setIsMenuOpen(false)}>Planos</a>
              <a href="#beneficios" onClick={() => setIsMenuOpen(false)}>Diferenciais</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
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

      <main className="flex-grow">
        {view === 'residential' ? (
          <ResidentialContent 
            handleOpenWhatsApp={handleOpenWhatsApp} 
            userCep={userCep} 
            setUserCep={setUserCep} 
            handleCepSubmit={handleCepSubmit} 
          />
        ) : (
          <BusinessContent handleOpenWhatsApp={handleOpenWhatsApp} />
        )}

        {/* Global Sections (About is usually same for both) */}
        {!view.includes('splash') && (
          <section id="sobre" className={`py-20 ${view === 'business' ? 'bg-[#002D72]' : 'bg-brand-bg'}`}>
            <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
              <h2 className={`text-4xl font-extrabold ${view === 'business' ? 'text-white' : 'text-brand-text'} leading-tight`}>Sobre a PinhaisNet</h2>
              <p className={`text-lg ${view === 'business' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed font-medium`}>
                Somos referência em Pinhais com 100% de tecnologia em fibra óptica. Entregamos ultra velocidade para residências e soluções de TI para empresas que buscam conectividade real e suporte especializado local.
              </p>
              <div className="flex justify-center gap-8 border-t border-brand-border pt-8 mt-8">
                <div className="text-center">
                  <div className="flex justify-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-2xl font-extrabold text-brand-primary">4.9/5</p>
                  <p className={`text-[10px] font-bold uppercase ${view === 'business' ? 'text-slate-400' : 'text-slate-500'}`}>Google</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-primary">1h</p>
                  <p className={`text-[10px] font-bold uppercase ${view === 'business' ? 'text-slate-400' : 'text-slate-500'}`}>Suporte</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-primary">100%</p>
                  <p className={`text-[10px] font-bold uppercase ${view === 'business' ? 'text-slate-400' : 'text-slate-500'}`}>Fibra</p>
                </div>
              </div>
            </div>
          </section>
        )}
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

function WhatsAppFloat({ onOpenForm, isBusiness }: { onOpenForm: () => void; isBusiness?: boolean }) {
  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-4">
      <AIAssistant onOpenForm={onOpenForm} isBusiness={isBusiness} />
      <motion.button
        onClick={onOpenForm}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="bg-[#25D366] text-white p-4 rounded-xl shadow-2xl pulse-urgency flex items-center justify-center gap-3 hover:brightness-110 transition-all font-bold text-sm"
      >
        <MessageCircle size={24} />
        <span>{isBusiness ? 'Consultor Corporativo' : 'Falar com Vendas'}</span>
      </motion.button>
    </div>
  );
}

function AIAssistant({ onOpenForm, isBusiness }: { onOpenForm: () => void; isBusiness?: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const resMessages = [
    "Olá! Sou a Inteligência Virtual da PinhaisNet. Posso te ajudar a escolher o melhor plano?",
    "🔥 EXTREMA URGÊNCIA: Só restam 7 vagas para a promoção de 500 Mega por R$ 119,90!",
    "Sabia que o plano de 500 Mega é o nosso campeão de vendas em Pinhais? Clique e garanta!",
    "⚡ INSTALAÇÃO EM 48H: Assine agora e tenha sua fibra instalada em tempo recorde!",
    "Centenas de pessoas em Pinhais e Colombo já mudaram para a PinhaisNet. Falta você!",
    "Quer um desconto exclusivo? Clique abaixo e peça o 'Cupom Site' para nosso consultor!"
  ];

  const busMessages = [
    "Olá! Consultor especializado para empresas. Como posso otimizar sua conectividade hoje?",
    "🚀 Link Dedicado 800 Mega com IP Fixo e SLA garantido. Ideal para sua empresa em Pinhais!",
    "Sabia que a PinhaisNet é líder em conectividade corporativa na região? Peça um orçamento!",
    "⚡ VIABILIDADE IMEDIATA: Atendemos Pinhais, Colombo e Piraquara com link redundante.",
    "Transporte PTT-PR ↔ PTT-SP com a menor latência do mercado. Fale com nosso consultor!",
    "Precisa de IP Fixo ou Rede Neutra? Temos a solução certa para escalar seu negócio."
  ];

  const messages = isBusiness ? busMessages : resMessages;

  useEffect(() => {
    setMessageIndex(0);
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
  }, [messages.length, isBusiness]);

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

function SocialProofNotifications({ isBusiness }: { isBusiness?: boolean }) {
  const [current, setCurrent] = useState<null | { name: string; city: string; plan: string }>(null);
  const residentialData = [
    { name: "Carlos A.", city: "Vargem Grande", plan: "500 Mega + Netflix" },
    { name: "Maria Oliveira", city: "Emiliano Perneta", plan: "500 Mega" },
    { name: "Felipe S.", city: "Centro de Pinhais", plan: "900 Mega Extreme" },
    { name: "Ana P.", city: "Alto Tarumã", plan: "700 Mega + TV" },
    { name: "Betina L.", city: "Weissópolis", plan: "500 Mega Social" },
    { name: "João Pedro", city: "Pineville", plan: "900 Mega Extreme" }
  ];

  const businessData = [
    { name: "Roberto A.", city: "Centro", plan: "Link Dedicado 800MB" },
    { name: "Supermercado X", city: "Vargem Grande", plan: "Link Dedicado" },
    { name: "Escola Y", city: "Colombo", plan: "Transporte PTT" },
    { name: "Clínica Z", city: "Weissópolis", plan: "Rede Neutra" },
    { name: "Logística W", city: "Atuba", plan: "Porta PON" }
  ];

  const data = isBusiness ? businessData : residentialData;

  useEffect(() => {
    const showNotification = () => {
      const random = data[Math.floor(Math.random() * data.length)];
      setCurrent(random);
      setTimeout(() => setCurrent(null), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    const timeout = setTimeout(showNotification, 3000); // Initial show

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isBusiness, data]);

  return (
    <AnimatePresence mode="wait">
      {current && (
        <motion.div
          key={`${isBusiness ? 'bus' : 'res'}-${current.name}-${current.plan}`}
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[100] bg-white/95 backdrop-blur-md border-l-4 border-brand-primary p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 max-w-[320px]"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,transparent,var(--color-brand-primary))]"
            />
            <Zap size={20} className="relative z-10" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {isBusiness ? '🚀 NOVO CLIENTE CORPORATIVO' : '⚡ NOVA ADESÃO RESIDENCIAL'}
            </p>
            <p className="text-xs text-brand-text leading-tight mt-1">
              <span className="font-extrabold">{current.name}</span> <span className="text-slate-400 font-medium">({current.city})</span> <br />
              {isBusiness ? 'ativou link' : 'assinou agora'} <span className="text-brand-primary font-black uppercase text-[10px] tracking-tight">{current.plan}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingSalesBalloons({ isBusiness }: { isBusiness?: boolean }) {
  const resBalloons = [
    { text: "Netflix 🍿 Inclusa", top: "15%", left: "5%", delay: 0 },
    { text: "Ping Baixo 🎮 Gamers", top: "45%", right: "5%", delay: 1 },
    { text: "Fibra 100% 🌍 Garantida", top: "75%", left: "8%", delay: 2 },
    { text: "Sem Fidelidade 🔓 Livre", top: "30%", right: "8%", delay: 3 }
  ];

  const busBalloons = [
    { text: "SLA 99.9% 🛡️ Contrato", top: "15%", left: "5%", delay: 0 },
    { text: "IP Fixo 🌐 Grátis", top: "45%", right: "5%", delay: 1 },
    { text: "Link Dedicado ⚡ Full", top: "75%", left: "8%", delay: 2 },
    { text: "Suporte 24/7 🤝 Premium", top: "30%", right: "8%", delay: 3 }
  ];

  const balloons = isBusiness ? busBalloons : resBalloons;

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

function SplashScreen({ onChoice }: { onChoice: (choice: 'residential' | 'business') => void }) {
  const [timeLeft, setTimeLeft] = useState(7);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#001D4A] flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)] opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center"
      >
        <div className="mb-8">
          <img 
            src="https://i.postimg.cc/P5LtNJs0/2cb7fae04e63ba4d58377fc56c8084da.png" 
            alt="PinhaisNet" 
            className="h-16 brightness-0 invert"
          />
        </div>
        
        <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter">
          COMO PODEMOS <span className="text-brand-primary uppercase">impulsionar</span> SEU DIA HOJE?
        </h1>
        <p className="text-slate-300 text-base md:text-xl mb-12 max-w-2xl font-medium">
          Escolha o perfil que melhor atende suas necessidades para uma experiência personalizada.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoice('residential')}
            className="group relative bg-white rounded-[2.5rem] p-8 flex flex-col items-center text-brand-text transition-all shadow-2xl border-4 border-transparent hover:border-brand-primary"
          >
            <div className="bg-brand-primary/10 p-6 rounded-2xl text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
              <Smartphone size={40} />
            </div>
            <h2 className="text-3xl font-black mb-2">Para Minha Casa</h2>
            <p className="text-slate-500 text-sm font-medium">Alta velocidade e diversão para toda família.</p>
            <div className="mt-8 flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-[0.2em]">
              ACESSAR AGORA <ArrowRight size={16} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoice('business')}
            className="group relative bg-[#002D72] border-4 border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-white transition-all shadow-2xl hover:border-brand-primary"
          >
            <div className="bg-white/10 p-6 rounded-2xl text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
              <Zap size={40} />
            </div>
            <h2 className="text-3xl font-black mb-2">Para Minha Empresa</h2>
            <p className="text-slate-300 text-sm font-medium">Link dedicado e soluções corporativas robustas.</p>
            <div className="mt-8 flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-[0.2em]">
              ACESSAR AGORA <ArrowRight size={16} />
            </div>
          </motion.button>
        </div>

        <div className="mt-16 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full">
          Entrando em residencial em <span className="text-brand-primary font-black w-4 inline-block">{timeLeft}</span>s
        </div>
      </motion.div>
    </div>
  );
}

function ResidentialContent({ handleOpenWhatsApp, userCep, setUserCep, handleCepSubmit }: { handleOpenWhatsApp: (plan?: string) => void; userCep: string; setUserCep: (v: string) => void; handleCepSubmit: (e: any) => void }) {
  return (
    <>
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

      {/* Plans Grid */}
      <section id="planos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div 
                key={plan.mbps}
                className={`bg-white border-2 rounded-2xl p-6 text-center transition-all flex flex-col relative ${plan.highlighted ? 'border-brand-primary shadow-xl scale-105 z-10' : 'border-brand-border shadow-sm'}`}
              >
                <div className="text-4xl font-extrabold text-brand-primary mb-1">{plan.mbps}MB</div>
                <div className="text-3xl font-extrabold text-brand-text mb-6">R$ {plan.price}</div>
                <div className="space-y-3 mb-8 pt-6 border-t border-slate-100 text-left">
                  <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Sem Fidelidade ⚡" />
                  <BenefitItem icon={<CheckCircle2 className="text-green-500" size={16} />} text="Instalação em 48h" />
                </div>
                <button 
                  onClick={() => handleOpenWhatsApp(plan.mbps)}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-extrabold text-lg shadow-lg"
                >
                  ASSINAR AGORA
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {DIFFERENTIALS.map((diff, idx) => (
              <FeatureCard key={idx} icon={<ShieldCheck size={20} className="text-brand-primary" />} title={diff.title} desc={diff.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Telephony */}
      <section id="telefonia" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-text text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
            <h2 className="text-2xl font-extrabold">Telefonia Fixa com Portabilidade</h2>
            <button onClick={() => handleOpenWhatsApp("Telefonia Fixa")} className="bg-white text-brand-text px-8 py-3 rounded-lg font-bold">Quero Telefone</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <WhatsAppMessage name={t.name} role={t.role} text={t.text} time={t.time} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BusinessContent({ handleOpenWhatsApp }: { handleOpenWhatsApp: (plan?: string) => void }) {
  return (
    <>
      {/* Business Hero */}
      <section className="relative bg-[#001D4A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069')] bg-cover" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-2/3 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-brand-primary/30 shadow-[0_0_20px_rgba(0,184,255,0.2)]">
              📈 Conectividade de Alto Desempenho
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              A INTERNET <br />
              QUE <span className="text-brand-primary">IMPULSIONA</span> <br />
              SEU NEGÓCIO.
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium">
              Link Dedicado, SLA Gerenciado e Atendimento Prioritário. Infraestrutura com Conexão Direta ao IX-BR para máxima performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <ShieldCheck size={20} className="text-brand-primary" />
                <span className="text-sm font-bold text-white">SLA 99.9%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Zap size={20} className="text-brand-primary" />
                <span className="text-sm font-bold text-white">Suporte 24/7/365</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Smartphone size={20} className="text-brand-primary" />
                <span className="text-sm font-bold text-white">Gerente Dedicado</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 w-full max-w-sm">
             {/* CTA CARD for 800MB based on image */}
             <div className="relative bg-white rounded-[2.5rem] p-8 text-center shadow-3xl transform hover:scale-[1.02] transition-all duration-500 border-b-8 border-brand-primary">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5 px-3 py-1 rounded-full border border-brand-primary/10">EXCLUSIVO CNPJ</span>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <h2 className="text-6xl font-black text-brand-text tracking-tighter">800</h2>
                    <span className="text-2xl font-black text-brand-primary uppercase">Mega</span>
                  </div>
                  <p className="text-brand-primary font-black uppercase text-xs tracking-[0.3em] mt-1 italic">Link Dedicado Full</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Investimento Mensal</span>
                  <div className="flex items-baseline justify-center gap-1 font-black text-brand-text">
                    <span className="text-xl">R$</span>
                    <span className="text-5xl tracking-tighter">899</span>
                    <span className="text-xl">,90</span>
                  </div>
                  <p className="text-[10px] text-brand-primary font-black uppercase mt-3 tracking-widest">+ IP FIXO + SLA GARANTIDO</p>
                </div>

                <button 
                  onClick={() => handleOpenWhatsApp("Empresarial 800 Mega Dedicado")}
                  className="w-full bg-[#001D4A] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/30 hover:bg-brand-primary transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle size={24} />
                  FALAR COM GERENTE
                </button>
                <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">Viabilidade técnica imediata</p>
             </div>
          </div>
        </div>
      </section>

      {/* Business Solutions Grid */}
      <section id="planos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-text tracking-tighter leading-tight">SOLUÇÕES QUE <br /> <span className="text-brand-primary underline decoration-brand-accent">TRANSFORMAM</span> SEU NEGÓCIO</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Customizamos a infraestrutura de acordo com o tamanho e a necessidade da sua empresa.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BUSINESS_PLANS.map((plan, i) => (
              <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center ${plan.highlighted ? 'border-brand-primary shadow-2xl scale-105 z-10 bg-white' : 'border-slate-100 hover:border-brand-primary/30 bg-slate-50'}`}>
                <h3 className="text-2xl font-black text-brand-text mb-2 tracking-tight uppercase">{plan.title}</h3>
                <div className="text-4xl font-black text-brand-primary mb-6 tracking-tighter">{plan.mbps}</div>
                
                <div className="w-full h-px bg-slate-200 mb-6" />
                
                <ul className="space-y-4 mb-8 text-left w-full">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                      <CheckCircle2 size={18} className="text-brand-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto w-full">
                   <div className="text-brand-text font-black text-2xl mb-4">
                     {plan.price === "Sob Consulta" ? "SOB CONSULTA" : `R$ ${plan.price}`}
                   </div>
                   <button 
                    onClick={() => handleOpenWhatsApp(plan.title)}
                    className={`w-full py-4 rounded-xl font-black transition-all shadow-lg ${plan.highlighted ? 'bg-brand-primary text-white hover:brightness-110' : 'bg-[#001D4A] text-white hover:bg-brand-primary'}`}
                   >
                     SOLICITAR ORÇAMENTO
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Highlights based on images */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
           {/* PTT Transporte */}
           <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit border border-brand-primary/20">Interligação de Dados</div>
                <h2 className="text-4xl md:text-5xl font-black text-brand-text tracking-tighter leading-tight">TRANSPORTE DE DADOS <br /> <span className="text-brand-primary italic">PTT-PR ↔ PTT-SP</span></h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">Sua empresa conectada entre Paraná e São Paulo com máxima performance, segurança e a menor latência do mercado.</p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <ShieldCheck className="text-brand-primary" size={32} />
                    <h4 className="font-extrabold text-brand-text">Alta Disponibilidade</h4>
                    <p className="text-xs text-slate-500">Redundância garantida em toda infraestrutura.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Zap className="text-brand-primary" size={32} />
                    <h4 className="font-extrabold text-brand-text">Baixa Latência</h4>
                    <p className="text-xs text-slate-500">Ideal para aplicações críticas em nuvem.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl opacity-50 pulse-urgency" />
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000" 
                  alt="Network Switch" 
                  className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
           </div>

           {/* Rede Neutra / Porta PON */}
           <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit border border-brand-accent/20">Business Scalability</div>
                <h2 className="text-4xl md:text-5xl font-black text-brand-text tracking-tighter leading-tight">AUMENTE SUA REDE <br /> <span className="text-brand-accent">SEM INVESTIMENTO</span> PESADO</h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">Com nossa locação de Porta PON e Rede Neutra, você expande sua operação sem custos de CAPEX em equipamentos caros.</p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-accent">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    <span className="font-bold text-slate-700">Escalabilidade sob demanda imediata</span>
                  </li>
                  <li className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-accent">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    <span className="font-bold text-slate-700">Zero investimento inicial em equipamentos</span>
                  </li>
                  <li className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border-l-4 border-brand-accent">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    <span className="font-bold text-slate-700">Suporte especializado 24/7 incluso</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 relative">
                 <div className="absolute -inset-4 bg-brand-accent/10 blur-3xl opacity-50" />
                 <img 
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2070" 
                  alt="Fiber Optical Cables" 
                  className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
                />
              </div>
           </div>
        </div>
      </section>

      {/* Business Testimonials */}
      <section className="py-20 bg-brand-text">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white">O QUE DIZEM NOSSOS <span className="text-brand-primary uppercase">PARCEIROS</span></h2>
           </div>
           <div className="flex flex-wrap justify-center gap-8">
              {BUSINESS_TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2 w-full max-w-[320px]">
                    <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full border border-white/20" />
                    <span className="text-xs font-bold text-slate-400">{t.name}</span>
                  </div>
                  <WhatsAppMessage name={t.name} role={t.role} text={t.text} time={t.time} />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Business Final CTA */}
      <section className="py-24 text-center">
         <div className="max-w-4xl mx-auto px-4 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">SUA EMPRESA <br /> MERECE O MELHOR.</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button 
                onClick={() => handleOpenWhatsApp("Empresarial Geral")}
                className="bg-brand-primary text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:brightness-110 flex items-center justify-center gap-3 active:scale-95 transition-all"
               >
                 <MessageCircle size={28} />
                 FALAR COM UM ESPECIALISTA
               </button>
               <div className="flex flex-col items-center justify-center text-slate-400 font-bold uppercase text-[10px] tracking-widest bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem]">
                 <Phone size={20} className="mb-2 text-brand-primary" />
                 LIGUE: (41) 4042-7600
               </div>
            </div>
         </div>
      </section>
    </>
  );
}

