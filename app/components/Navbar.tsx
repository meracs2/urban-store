'use client';
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ESTILOS CSS PARA LA ANIMACIÓN DE LOS CRISTALES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes caerCristal {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(25px) rotate(360deg); opacity: 0; }
        }
        .cristal-hielo {
          position: absolute;
          color: rgba(255, 255, 255, 0.7);
          font-family: Arial, sans-serif;
          pointer-events: none;
          z-index: 10;
          user-select: none;
        }
        .c1 { left: 15%; font-size: 14px; animation: caerCristal 6s linear infinite; animation-delay: 0s; }
        .c2 { left: 45%; font-size: 18px; animation: caerCristal 9s linear infinite; animation-delay: -2s; }
        .c3 { left: 65%; font-size: 12px; animation: caerCristal 7s linear infinite; animation-delay: -4s; }
        .c4 { left: 85%; font-size: 22px; animation: caerCristal 11s linear infinite; animation-delay: -1s; }
        .c5 { left: 25%; font-size: 15px; animation: caerCristal 8s linear infinite; animation-delay: -5s; }
      `}} />

      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50 h-16 md:h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* LADO IZQUIERDO: Botón Hamburguesa + Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-neutral-800 p-1 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
              aria-label="Menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            {/* LOGO */}
            <Link href="/" className="flex flex-col select-none" onClick={() => setIsOpen(false)}>
              <span className="text-base md:text-xl font-black text-neutral-950 tracking-tight leading-none">URBAN</span>
              <span className="text-base md:text-xl font-black text-amber-800 tracking-tight leading-none">STORE</span>
            </Link>
          </div>

          {/* ENLACES ESCRITORIO (PC) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-neutral-900">
            <Link href="/" className="hover:text-neutral-950 transition">Inicio</Link>
            <Link href="/productos" className="hover:text-neutral-950 transition">Productos</Link>
            <Link href="/contacto" className="hover:text-neutral-950 transition">Contacto</Link>
          </div>

          {/* BOTÓN DEL CARRITO */}
          <button 
            onClick={() => { setIsOpen(false); onCartClick(); }}
            className="relative inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-amber-800 text-white text-xs font-bold px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 bg-slate-500/10 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* CAMBIO ACÁ: Panel con degradado de fondo (de blanco/25 transparente a blanco/65 más denso abajo) */}
      <div className={`md:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-gradient-to-b from-white/25 via-white/40 to-white/70 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between border-r border-white/60 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Cristales en movimiento de fondo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
          <div className="cristal-hielo c1">❄</div>
          <div className="cristal-hielo c2">✦</div>
          <div className="cristal-hielo c3">❄</div>
          <div className="cristal-hielo c4">✧</div>
          <div className="cristal-hielo c5">❄</div>
        </div>

        {/* Enlaces superiores */}
        <div className="relative z-20 flex flex-col gap-8 mt-16">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-slate-700 hover:text-neutral-950 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-bold text-slate-800 hover:text-neutral-950 tracking-wide transition border-b border-white/40 pb-2"
          >
            Inicio
          </Link>
          <Link 
            href="/productos" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-black text-amber-900 tracking-wide transition border-b border-white/40 pb-2"
          >
            Catálogo
          </Link>
          <Link 
            href="/contacto" 
            onClick={() => setIsOpen(false)} 
            className="text-xl font-bold text-slate-800 hover:text-neutral-950 tracking-wide transition border-b border-white/40 pb-2"
          >
            Contacto
          </Link>
        </div>

        {/* Base con "efecto acumulado" sutil por el degradado */}
        <div className="relative z-20 border-t border-white/50 pt-4 mb-4">
          <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest text-center">
            WINTER COLLECTION • 2026
          </p>
        </div>

      </div>
    </>
  );
}