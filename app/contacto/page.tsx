'use client';
import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'Soporte / Compra',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Simula el envío (puedes conectar Formspree o Resend acá después)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ nombre: '', email: '', asunto: 'Soporte / Compra', mensaje: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen text-neutral-800 font-sans pt-28 pb-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100">
        
        {/* Columna Izquierda: Info Estética */}
        <div className="md:col-span-2 bg-[#ebe6dd] p-8 flex flex-col justify-between relative">
          <div>
            <span className="text-amber-800 bg-amber-100/80 border border-amber-200/50 font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
              Atención 2026
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900 mt-4 tracking-tight">
              Ponete en contacto
            </h2>
            <p className="mt-2 text-sm text-neutral-900">
              ¿Tuviste un problema con tu combo o buscás información sobre envíos? Escribinos.
            </p>
          </div>

          <div className="mt-8 space-y-4 text-sm text-neutral-700">
            <p>📍 Showroom en Córdoba, ARG</p>
            <p>⏰ Lunes a Viernes: 09 a 18 hs</p>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="md:col-span-3 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-800 focus:bg-white transition"
                placeholder="Ej. Sofía Pérez"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-800 focus:bg-white transition"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">Motivo</label>
              <select
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-800 focus:bg-white transition cursor-pointer"
              >
                <option value="Soporte / Compra">Problema con una compra</option>
                <option value="Ventas Mayoristas">Ventas Mayoristas</option>
                <option value="Feedback">Sugerencias</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                required
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-800 focus:bg-white transition resize-none"
                placeholder="Escribí tu mensaje acá..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-900 hover:bg-amber-800 disabled:bg-neutral-400 text-white font-semibold py-3 rounded-xl transition text-sm cursor-pointer"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {status === 'success' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl text-center">
                ¡Mensaje recibido con éxito! Te responderemos pronto.
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}