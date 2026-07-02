'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [clave, setClave] = useState('');
  
  // Estado para los datos del producto
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [tag, setTag] = useState('');

  const verificarClave = () => {
    if (clave === "miTienda2026") setAutenticado(true);
    else alert("Clave incorrecta");
  };

  const guardarProducto = async () => {
    const { error } = await supabase
      .from('productos')
      .insert([{ nombre, descripcion, precio: parseInt(precio), imagen, tag }]);

    if (error) alert("Error: " + error.message);
    else {
      alert("¡Producto cargado con éxito!");
      // Limpiar campos
      setNombre(''); setDescripcion(''); setPrecio(''); setImagen(''); setTag('');
    }
  };

  if (!autenticado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#fcfbf9]">
        <input type="password" placeholder="Clave de admin" className="border p-2 mb-4 rounded" onChange={(e) => setClave(e.target.value)} />
        <button className="bg-neutral-900 text-white px-6 py-2 rounded" onClick={verificarClave}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Cargar Nuevo Producto</h1>
      <input className="w-full border p-3 mb-3 rounded" placeholder="Nombre del combo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input className="w-full border p-3 mb-3 rounded" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <input className="w-full border p-3 mb-3 rounded" placeholder="Precio (número)" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      <input className="w-full border p-3 mb-3 rounded" placeholder="URL de la imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
      <input className="w-full border p-3 mb-3 rounded" placeholder="Tag (ej: Más vendido)" value={tag} onChange={(e) => setTag(e.target.value)} />
      
      <button 
        className="w-full bg-emerald-800 text-white p-4 rounded-xl font-bold hover:bg-emerald-900 transition" 
        onClick={guardarProducto}
      >
        Guardar en Base de Datos
      </button>
    </div>
  );
}