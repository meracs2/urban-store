'use client';
import { useState } from 'react';
import Link from 'next/link';

// Lista de productos con imágenes estables y masculinas
const productosDatos = [
  {
    id: 1,
    nombre: "Buzo Oversize Hoodie",
    categoria: "buzos",
    precio: 32000,
    imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60", 
    desc: "Frisa pesada premium, ideal para el frío."
  },
  {
    id: 2,
    nombre: "Remera Heavy Weight",
    categoria: "remeras",
    precio: 18000,
    imagen: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60", 
    desc: "Algodón 20/1 de alta densidad, calce boxy negro liso."
  },
  {
    id: 3,
    nombre: "Pantalón Cargo Urban",
    categoria: "pantalones",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60", 
    desc: "Corte relajado con bolsillos laterales técnicos."
  },
  {
    id: 4,
    nombre: "Camperón Puffer Winter",
    categoria: "camperas",
    precio: 65000,
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60", 
    desc: "Térmica e impermeable, máxima protección."
  },
  {
    id: 5,
    nombre: "Zapatillas Street Retro",
    categoria: "zapatillas",
    precio: 58000,
    imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60", 
    desc: "Plataforma urbana con cordones reforzados y gamuza."
  },
  {
    id: 6,
    nombre: "Zapatos Derby Cuero",
    categoria: "zapatos",
    precio: 72000,
    imagen: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop&q=60", 
    desc: "Cuero vacuno legítimo, terminación artesanal premium."
  },
  {
    id: 7,
    nombre: "Set Invernal Masculino",
    categoria: "gorros",
    precio: 24000,
    // Nueva URL ultra estable de un set invernal de lana oscuro (Gorro y bufanda)
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Winter_hat_and_scarf.jpg/640px-Winter_hat_and_scarf.jpg", 
    desc: "Combo de abrigo completo con gorro de lana, bufanda térmica y guantes reforzados."
  }
];

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const productosFiltrados = categoriaActiva === 'todos'
    ? productosDatos
    : productosDatos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="bg-[#fcfbf9] min-h-screen font-sans text-neutral-800">
      
      {/* Botón para volver */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-amber-800 hover:text-amber-900 transition"
        >
          ← Volver al Inicio
        </Link>
      </div>

      <header className="py-10 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
          Nuestro Catálogo
        </h1>
        <p className="mt-2 text-neutral-600 max-w-md mx-auto text-sm">
          Filtrá por categoría para encontrar tu outfit ideal.
        </p>

        {/* BOTONES DE CATEGORÍAS */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-4">
          {[
            { id: 'todos', nombre: 'Todos' },
            { id: 'remeras', nombre: 'Remeras' },
            { id: 'buzos', nombre: 'Buzos' },
            { id: 'pantalones', nombre: 'Pantalones' },
            { id: 'camperas', nombre: 'Camperas' },
            { id: 'zapatillas', nombre: 'Zapatillas' },
            { id: 'zapatos', nombre: 'Zapatos' },
            { id: 'gorros', nombre: 'Gorros y Accesorios' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition duration-200 shadow-sm ${
                categoriaActiva === cat.id
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS FILTRADOS */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productosFiltrados.map((producto) => (
            <div 
              key={producto.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 p-4 group hover:shadow-md transition duration-300"
            >
              <div className="h-64 bg-neutral-100 rounded-xl overflow-hidden relative">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  onError={(e) => {
                    // Respaldo por si falla la carga principal de la imagen
                    if(producto.categoria === 'gorros') {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60";
                    }
                  }}
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-base text-neutral-900 group-hover:text-amber-800 transition">
                  {producto.nombre}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">{producto.desc}</p>
                
                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Precio</span>
                    <span className="text-lg font-extrabold text-neutral-900">
                      ${producto.precio.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button className="bg-neutral-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje por si una categoría se queda vacía */}
        {productosFiltrados.length === 0 && (
          <p className="text-center text-neutral-500 mt-12">No hay productos en esta categoría por el momento.</p>
        )}
      </main>

    </div>
  );
}