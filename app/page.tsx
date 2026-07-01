'use client';
import { useState } from 'react';
import Link from 'next/link';

// Lista base con los 6 combos tendencia
const combosBase = [
  {
    id: 1,
    nombre: "Combo Street Winter",
    descripcion: "Camperón puffer + Pantalón Cargo + Gorro lana",
    precio: 85000,
    imagen: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500&auto=format&fit=crop&q=60",
    tag: "Más vendido"
  },
  {
    id: 2,
    nombre: "Combo Urban Chill",
    descripcion: "Buzo Oversize Hoodie + Jogger Premium",
    precio: 52000,
    imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60",
    tag: "Tendencia"
  },
  {
    id: 3,
    nombre: "Combo Copping Casual",
    descripcion: "Campera Denim c/ corderito + Remera Heavy Weight",
    precio: 68000,
    imagen: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&auto=format&fit=crop&q=60",
    tag: "15% OFF"
  },
  {
    id: 4,
    nombre: "Combo Alpine Comfort",
    descripcion: "Chaleco Inflable + Buzo Fleece + Medias térmicas",
    precio: 49500,
    imagen: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=60",
    tag: "Novedad"
  },
  {
    id: 5,
    nombre: "Combo Alpha Tech",
    descripcion: "Rompeviento Impermeable + Piluso Corduroy + Hoodie Negro",
    precio: 72000,
    imagen: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&auto=format&fit=crop&q=60",
    tag: "Exclusivo"
  },
  {
    id: 6,
    nombre: "Combo Cyber Street",
    descripcion: "Campera Bomber + Pantalón Parachute + Cadena Urban",
    precio: 79900,
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60",
    tag: "Últimos pares"
  }
];

// Duplicamos la lista para el empalme infinito perfecto
const combosInfinitos = [...combosBase, ...combosBase];

export default function LandingPage() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-[#fcfbf9] min-h-screen font-sans text-neutral-800 overflow-x-hidden">
      
      {/* Estilos CSS inyectados para lograr el movimiento continuo líquido */}
      <style jsx global>{`
        @keyframes carruselLiquido {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animacion-carrusel-activo {
          animation: carruselLiquido 22s linear infinite;
        }
        .animacion-carrusel-pausado {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. HERO SECTION CON PALETA ORGÁNICA REFINADA (MUESTRA DE LA FOTO) */}
      <section className="relative h-[85vh] min-h-[550px] w-full flex items-center justify-center overflow-hidden bg-neutral-950 mt-12">
        
        {/* Imagen de Fondo (Perchero de Invierno) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1600&auto=format&fit=crop" 
            alt="Perchero con Outfit Urbano de Invierno" 
            className="w-full h-full object-cover object-center scale-102"
          />
          {/* Capa oscura texturizada para amalgamar los elementos */}
          <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[0.5px]"></div>
        </div>

        {/* Bloque de Texto y Acciones */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6 flex flex-col items-center">
          
          {/* Tag superior en tono habano/tabaco */}
          <span className="bg-[#8c6239]/90 text-[#f7f5f0] border border-[#a67c52]/30 font-bold text-[10px] md:text-xs tracking-widest uppercase px-3.5 py-1 rounded-full shadow-sm mb-5">
            Colección Invierno 2026
          </span>
          
          {/* Título en Blanco Hueso con acento Camel Orgánico */}
          <h1 className="text-4xl md:text-6xl font-black text-stone-100 tracking-tight leading-tight uppercase drop-shadow-sm">
            Elevá tu estilo <br />
            <span className="text-[#d4a373]">bajo cero</span>
          </h1>
          
          <p className="mt-4 text-sm md:text-lg text-stone-300/90 max-w-md font-medium drop-shadow-sm">
            Descubrí prendas diseñadas para el frío con texturas premium y la paleta de colores más buscada de la temporada.
          </p>
          
          {/* Botones integrados a la paleta tierra */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 w-full max-w-xs sm:max-w-none">
            <Link 
              href="/productos" 
              className="bg-[#b07d4e] hover:bg-[#966437] text-stone-50 font-bold px-7 py-3.5 rounded-xl transition shadow-md text-center text-xs md:text-sm cursor-pointer"
            >
              Ver Catálogo Completo
            </Link>
            <a 
              href="#combos" 
              className="bg-white/5 hover:bg-white/10 text-stone-200 font-bold px-7 py-3.5 rounded-xl transition border border-stone-200/20 backdrop-blur-md text-center text-xs md:text-sm cursor-pointer"
            >
              Ver Combos Especiales
            </a>
          </div>
        </div>
      </section>

      {/* 2. CARRUSEL LÍQUIDO CONTINUO */}
      <section id="combos" className="py-16 overflow-hidden max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 px-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              Combos Destacados ❄️
            </h2>
            <p className="text-neutral-900 text-sm mt-1">
              Desplazamiento continuo premium. Apoyá el mouse o mantené presionado para pausar.
            </p>
          </div>
        </div>

        {/* Contenedor Máscara */}
        <div 
          className="w-full overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Degradados laterales estéticos */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#fcfbf9] to-transparent z-10 pointer-events-none hidden md:block"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#fcfbf9] to-transparent z-10 pointer-events-none hidden md:block"></div>

          {/* Fila en movimiento continuo */}
          <div 
            className={`flex gap-6 w-max py-4 px-6 ${
              isPaused ? 'animacion-carrusel-pausado' : ''
            } animacion-carrusel-activo`}
          >
            {combosInfinitos.map((combo, index) => (
              <div 
                key={`${combo.id}-${index}`}
                className="w-[280px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-700/30 transition duration-300 border border-neutral-100 flex-shrink-0 relative group"
              >
                <span className="absolute top-4 left-4 bg-emerald-800 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg z-10 shadow-sm">
                  {combo.tag}
                </span>
                
                <div className="h-60 bg-neutral-100 relative overflow-hidden">
                  <img 
                    src={combo.imagen} 
                    alt={combo.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-amber-800 transition truncate">
                    {combo.nombre}
                  </h3>
                  <p className="text-xs text-neutral-900 mt-1 line-clamp-2 min-h-[32px]">
                    {combo.descripcion}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                    <div>
                      <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Precio Especial</span>
                      <span className="text-lg font-extrabold text-neutral-900">
                        ${combo.precio.toLocaleString('es-AR')}
                      </span>
                    </div>
                    
                    <Link
                      href="/productos"
                      className="bg-neutral-900 hover:bg-amber-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-sm"
                    >
                      Ver Tienda
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORÍAS */}
      <section className="bg-[#f5f3ef] py-16 px-6 rounded-t-[2.5rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Comprá por Categorías
            </h2>
            <p className="text-neutral-900 text-sm mt-1 max-w-sm mx-auto">
              Navegá de forma directa hacia los abrigos y prendas esenciales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Abrigos & Camperas", desc: "Puffers, parkas y denim premium", color: "bg-amber-700/10 text-amber-900 hover:bg-amber-700/15" },
              { name: "Buzos & Hoodies", desc: "Frisa pesada y calces oversize", color: "bg-emerald-800/10 text-emerald-900 hover:bg-emerald-800/15" },
              { name: "Pantalones & Cargos", desc: "Corte urbano y comodidad técnica", color: "bg-stone-800/10 text-neutral-900 hover:bg-stone-800/15" }
            ].map((cat, idx) => (
              <Link 
                href="/productos" 
                key={idx}
                className={`p-8 rounded-2xl ${cat.color} transition duration-300 text-left flex flex-col justify-between h-44 group cursor-pointer border border-black/5`}
              >
                <div>
                  <h3 className="font-bold text-xl tracking-tight">{cat.name}</h3>
                  <p className="text-xs opacity-80 mt-1">{cat.desc}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Explore Colección →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}