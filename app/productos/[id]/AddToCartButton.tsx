'use client';
import { useCart } from '../../components/CartContext';
import { toast } from 'sonner'; // Asumo que usas sonner por lo que dijiste

export default function AddToCartButton({ producto }: { producto: any }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(producto);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="mt-10 w-full bg-neutral-900 hover:bg-amber-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg cursor-pointer"
    >
      Agregar al carrito
    </button>
  );
}