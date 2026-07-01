'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importante para la navegación
import { useCart } from '../components/CartContext';
import { toast } from 'sonner';

const productosDatos = [
  { id: 1, nombre: "Buzo Oversize Hoodie", categoria: "buzos", precio: 32000, imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", desc: "Frisa pesada premium, ideal para el frío." },
  { id: 2, nombre: "Remera Heavy Weight", categoria: "remeras", precio: 18000, imagen: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800", desc: "Algodón 20/1 de alta densidad, calce boxy negro liso." },
  { id: 3, nombre: "Pantalón Cargo Urban", categoria: "pantalones", precio: 45000, imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", desc: "Corte relajado con bolsillos laterales técnicos." },
  { id: 4, nombre: "Camperón Puffer Winter", categoria: "camperas", precio: 65000, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", desc: "Térmica e impermeable, máxima protección." },
  { id: 5, nombre: "Zapatillas Street Retro", categoria: "zapatillas", precio: 58000, imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800", desc: "Plataforma urbana con cordones reforzados y gamuza." },
  { id: 6, nombre: "Zapatos Derby Cuero", categoria: "zapatos", precio: 72000, imagen: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800", desc: "Cuero vacuno legítimo, terminación artesanal premium." },
  { id: 7, nombre: "Set Invernal Masculino", categoria: "gorros", precio: 24000, imagen: "https://images.unsplash.com/photo-1576871337632-b9a64c4c0a8a?w=800", desc: "Combo de abrigo completo con gorro de lana, bufanda térmica y guantes reforzados." }
];

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const { addItem } = useCart();

  const filtrados = categoriaActiva === 'todos' ? productosDatos : productosDatos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">Catálogo Urban</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtrados.map((p) => (
            <Link key={p.id} href={`/productos/${p.id}`} className="block group">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-4 hover:shadow-lg transition-all duration-300">
                <div className="h-72 relative rounded-xl overflow-hidden mb-4 bg-neutral-100">
                  <Image 
                    src={p.imagen} 
                    alt={p.nombre} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h3 className="font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">{p.nombre}</h3>
                <p className="text-sm text-neutral-500 mb-4">{p.desc}</p>
                <div 
                  onClick={(e) => {
                    e.preventDefault(); // Evita que al apretar "Agregar" navegue al detalle
                    addItem(p);
                    toast.success(`¡Agregado al carrito!`, { 
                      description: p.nombre 
                    });
                  }}
                  className="w-full bg-neutral-900 text-white text-center py-3 rounded-xl font-bold hover:bg-[#b07d4e] transition cursor-pointer"
                >
                  Agregar al carrito
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}