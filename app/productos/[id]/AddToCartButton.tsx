'use client';
import { useCart } from '../../components/CartContext';
import { toast } from 'sonner';

export default function AddToCartButton({ producto }: { producto: any }) {
  const { cartItems, addItem, minusItem } = useCart();
  
  const itemEnCarrito = cartItems.find((item) => item.id === producto.id);

  if (itemEnCarrito) {
    return (
      <div className="mt-10 flex items-center justify-between bg-neutral-100 p-2 rounded-xl border border-neutral-200">
        <button 
          onClick={() => minusItem(producto.id)}
          className="bg-white p-3 rounded-lg shadow-sm font-bold text-neutral-900 hover:bg-neutral-50 px-5 cursor-pointer"
        > - </button>
        
        {/* ACÁ ESTÁ EL CAMBIO: text-neutral-950 fuerza el negro puro */}
        <span className="font-black text-2xl text-neutral-950 px-4">
          {itemEnCarrito.quantity}
        </span>
        
        <button 
          onClick={() => addItem(producto)}
          className="bg-white p-3 rounded-lg shadow-sm font-bold text-neutral-900 hover:bg-neutral-50 px-5 cursor-pointer"
        > + </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => {
        addItem(producto);
        toast.success(`${producto.nombre || producto.name} agregado`);
      }}
      className="mt-10 w-full bg-neutral-900 hover:bg-amber-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg cursor-pointer"
    >
      Agregar al carrito
    </button>
  );
}