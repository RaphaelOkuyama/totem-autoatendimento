import { ArrowRight,CreditCard, Github, MonitorSmartphone, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import successPayment from "../../docs/sucess-payment.png";
// Importações com o caminho correto baseado na sua estrutura src/app/page.tsx -> ../../docs/
import telaBoasVindas from "../../docs/tela-de-boas-vindas.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-zinc-100 font-sans selection:bg-yellow-500 selection:text-black flex flex-col overflow-x-hidden">
      
      <main className="container mx-auto px-6 pt-16 pb-12 lg:pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 flex-grow">
        
        {/* Lado Esquerdo - Textos e Botões */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:max-w-xl">
          
          {/* Badges de Tecnologias */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="bg-white text-black text-[10px] px-1 rounded-sm font-bold">N</span> Next.js 15
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-blue-600 border border-zinc-200 text-sm font-semibold shadow-sm">
              ◉ Stripe
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-emerald-600 border border-zinc-200 text-sm font-semibold shadow-sm">
              ◭ Prisma
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-blue-500 border border-zinc-200 text-sm font-semibold shadow-sm">
              PostgreSQL
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white text-cyan-500 border border-zinc-200 text-sm font-semibold shadow-sm">
              Tailwind CSS
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Totem de <br /> autoatendimento
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
            Sistema completo de pedidos para restaurantes — cardápio digital, carrinho e pagamento via Stripe, tudo em um fluxo mobile-first.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/fsw-donalds" 
              className="w-full sm:w-auto px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              Testar o totem
            </Link>
            
            <Link 
              href="https://github.com/RaphaelOkuyama/totem-autoatendimento" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Github className="w-5 h-5" />
              Ver código
            </Link>
          </div>
        </div>

        {/* Lado Direito - Mockups de Celular Animados (Corrigido para Mobile) */}
        <div className="flex-1 w-full flex justify-center items-center mt-12 lg:mt-0 pb-12 lg:pb-0">
            {/* Container invisível que segura o tamanho real da seção */}
            <div className="relative w-[300px] sm:w-[400px] lg:w-[450px] h-[380px] sm:h-[480px] lg:h-[550px]">
              {/* Celular do fundo (Sucesso) */}
              <div className="absolute top-12 right-0 w-[160px] sm:w-[220px] lg:w-[280px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-[4px] sm:border-[6px] border-white shadow-2xl opacity-90 animate-float-delayed bg-white">
                 <Image 
                   src={successPayment}
                   alt="Tela de Sucesso" 
                   className="w-full h-auto object-cover"
                   placeholder="blur"
                   priority
                 />
              </div>
              {/* Celular da frente (Boas Vindas) */}
              <div className="absolute top-0 left-0 w-[160px] sm:w-[220px] lg:w-[280px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-[4px] sm:border-[6px] border-white shadow-2xl z-10 animate-float bg-white">
                 <Image 
                   src={telaBoasVindas}
                   alt="Tela de Boas Vindas" 
                   className="w-full h-auto object-cover"
                   placeholder="blur"
                   priority
                 />
              </div>
            </div>
        </div>
      </main>

      {/* CARDS FEATURES */}
      <section className="container mx-auto px-6 pb-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-[#2a2a2a] border border-[#3a3a3a] rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
              <MonitorSmartphone className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Cardápio digital</h3>
            <p className="text-zinc-400 font-medium">Categorias, produtos, ingredientes e navegação por scroll.</p>
          </div>
          
          <div className="p-8 bg-[#2a2a2a] border border-[#3a3a3a] rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Carrinho completo</h3>
            <p className="text-zinc-400 font-medium">Adicionar, ajustar quantidade e remover itens em tempo real.</p>
          </div>
          
          <div className="p-8 bg-[#2a2a2a] border border-[#3a3a3a] rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Pagamento Stripe</h3>
            <p className="text-zinc-400 font-medium">Checkout Session + Webhooks com status em tempo real.</p>
          </div>

        </div>
      </section>

      {/* RODAPÉ (FOOTER) */}
      <footer className="border-t border-[#3a3a3a] py-8 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 font-medium text-sm text-center md:text-left">
            Desenvolvido por Raphael Okuyama · FullStackClub
          </p>
          <div className="flex items-center gap-6 font-medium">
            <Link 
              href="https://www.linkedin.com/in/raphael-okuyama/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://portfolio-raphael-okuyama.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Portfólio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}