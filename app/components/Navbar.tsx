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
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50 h-16 md:h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* LADO IZQUIERDO: Botón Hamburguesa (Solo celular) + Logo */}
          <div className="flex items-center gap-3">
            {/* Botón menú móvil */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-neutral-800 p-1 hover:bg-neutral-100 rounded-lg transition"
              aria-label="Menu"
            >
              {isOpen ? (
                // Ícono de Cruz (Cerrar)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                // Ícono de tres rayas (Hamburguesa)
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

          {/* ENLACES ESCRITORIO: Invisibles en celu, visibles en PC */}
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

      {/* MENÚ DESPLEGABLE MÓVIL: Aparece suavemente desde arriba cuando isOpen es true */}
      <div className={`md:hidden fixed inset-x-0 bg-white border-b border-neutral-200 z-40 transition-all duration-300 shadow-lg ${
        isOpen ? 'top-16 opacity-100' : '-top-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col p-6 gap-4 font-semibold text-neutral-800 text-base">
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 px-3 hover:bg-neutral-50 rounded-xl transition">
            Inicio
          </Link>
          <Link href="/productos" onClick={() => setIsOpen(false)} className="py-2 px-3 hover:bg-neutral-50 rounded-xl transition text-amber-800">
            Catálogo de Productos
          </Link>
          <Link href="/contacto" onClick={() => setIsOpen(false)} className="py-2 px-3 hover:bg-neutral-50 rounded-xl transition">
            Contacto
          </Link>
        </div>
      </div>
    </>
  );
}