import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

const productosDatos = [
  { id: 1, nombre: "Buzo Oversize Hoodie", precio: 32000, imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", desc: "Frisa pesada premium, ideal para el frío." },
  { id: 2, nombre: "Remera Heavy Weight", precio: 18000, imagen: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800", desc: "Algodón 20/1 de alta densidad, calce boxy negro liso." },
  { id: 3, nombre: "Pantalón Cargo Urban", precio: 45000, imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", desc: "Corte relajado con bolsillos laterales técnicos." },
  { id: 4, nombre: "Camperón Puffer Winter", precio: 65000, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", desc: "Térmica e impermeable, máxima protección." },
  { id: 5, nombre: "Zapatillas Street Retro", precio: 58000, imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800", desc: "Plataforma urbana con cordones reforzados y gamuza." },
  { id: 6, nombre: "Zapatos Derby Cuero", precio: 72000, imagen: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800", desc: "Cuero vacuno legítimo, terminación artesanal premium." },
  { id: 7, nombre: "Set Invernal Masculino", precio: 24000, imagen: "/images/set-invernal.jpg", desc: "Combo de abrigo completo con gorro de lana, bufanda térmica y guantes reforzados." }
];

export default async function DetalleProducto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = productosDatos.find((p) => p.id.toString() === id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfbf9] pt-28 pb-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <a href="/productos" className="text-neutral-500 hover:text-amber-800 transition-colors text-sm font-semibold mb-8 block">
          ← Volver al catálogo
        </a>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="w-full h-[450px] bg-[#ebe6dd] rounded-2xl overflow-hidden shadow-sm relative">
            <Image 
              src={producto.imagen} 
              alt={producto.nombre} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-black text-neutral-900 tracking-tight">{producto.nombre}</h1>
            <p className="text-2xl font-bold text-amber-800 mt-4">${producto.precio.toLocaleString()}</p>
            
            <div className="mt-6 space-y-4">
              <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-xs">Descripción</h3>
              <p className="text-neutral-600 leading-relaxed">{producto.desc}</p>
            </div>

            <AddToCartButton producto={producto} />
          </div>
        </div>
      </div>
    </main>
  );
}