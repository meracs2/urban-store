"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    // Acá procesaremos la simulación en el Punto C
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      
      {/* Botón flotante para volver al Inicio */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
      >
        ← Volver a la Tienda
      </Link>

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center tracking-tight text-gray-100">
          Contacto
        </h1>
        <p className="text-sm text-gray-400 text-center mt-2 mb-8">
          ¿Tenés alguna duda con tu talle o envío? Escribinos.
        </p>

        {enviado ? (
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6 text-center animate-fade-in">
            <h3 className="text-lg font-semibold text-blue-400">¡Mensaje recibido!</h3>
            <p className="text-sm text-gray-400 mt-2">
              Te vamos a responder al correo lo antes posible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Nombre Completo
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="juan@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Tu Mensaje
              </label>
              <textarea 
                rows={4}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="¿En qué te podemos ayudar?"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors shadow-lg shadow-blue-600/10 mt-2"
            >
              Enviar Mensaje
            </button>
          </form>
        )}
      </div>
    </main>
  );
}