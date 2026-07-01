'use client';
import { toast } from 'sonner';

// --- CONFIGURACIÓN DE NOTIFICACIONES ---
// Podés cambiar estos valores a 'true' para activar el feedback en la demo
const CONFIG = {
  enableQuantityNotifications: false, 
  enableDeleteNotification: true,
};

interface CartItem {
  id: number;
  name: string;
  price: number;
  priceString: string;
  image: string;
  category: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddItem: (item: any) => void;
  onMinusItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onAddItem, 
  onMinusItem, 
  onRemoveItem 
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(totalPrice);

  const handleCheckout = () => {
    const tuTelefono = "5493512456648"; 

    let mensaje = `¡Hola Urban Store! 👋 Quisiera hacer el siguiente pedido:\n\n`;
    
    cartItems.forEach((item) => {
      mensaje += `▪️ ${item.name} (x${item.quantity}) - ${item.priceString} c/u\n`;
    });

    mensaje += `\n💰 *Total Estimado: ${formattedTotal}*`;
    mensaje += `\n\n¿Tienen disponibilidad para coordinar el envío? 🙌`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${tuTelefono}?text=${mensajeCodificado}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-900/40 backdrop-blur-sm font-sans">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#fcfbf9] h-full shadow-2xl p-6 flex flex-col justify-between text-neutral-800 border-l border-neutral-200/60">
        
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
            <h2 className="text-lg font-black tracking-wide text-neutral-900 uppercase">
              Tu <span className="text-amber-800">Carrito</span>
            </h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold p-2 transition-colors cursor-pointer">
              Cerrar ✕
            </button>
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <span className="text-3xl block">❄️</span>
                <p className="text-neutral-400 text-sm font-medium">Tu carrito está vacío.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-neutral-100 relative group/item shadow-sm">
                  <div className="w-16 h-16 bg-[#ebe6dd] rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow pr-6">
                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-amber-800 font-medium mt-0.5">{item.priceString} c/u</p>
                    
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <button 
                        onClick={() => {
                          onMinusItem(item.id);
                          if (CONFIG.enableQuantityNotifications) {
                            toast("Carrito", { description: `Redujiste la cantidad de ${item.name}` });
                          }
                        }} 
                        className="w-6 h-6 flex items-center justify-center bg-[#ebe6dd] hover:bg-neutral-200 rounded-lg text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                      >-</button>
                      
                      <span className="text-xs font-bold px-2 w-6 text-center text-neutral-900">{item.quantity}</span>
                      
                      <button 
                        onClick={() => {
                          onAddItem(item);
                          if (CONFIG.enableQuantityNotifications) {
                            toast("Carrito", { description: `Aumentaste la cantidad de ${item.name}` });
                          }
                        }} 
                        className="w-6 h-6 flex items-center justify-center bg-[#ebe6dd] hover:bg-neutral-200 rounded-lg text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      onRemoveItem(item.id);
                      if (CONFIG.enableDeleteNotification) {
                        toast("Producto eliminado", {
                          description: `${item.name} se quitó del carrito.`,
                          className: 'border-l-4 border-l-rose-400',
                        });
                      }
                    }} 
                    className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 text-xs p-1 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 pt-4 space-y-4">
            <div className="flex justify-between items-baseline font-bold text-lg">
              <span className="text-neutral-500 text-sm uppercase tracking-wider">Total Estimado:</span>
              <span className="text-neutral-900 text-2xl font-black tracking-tight">{formattedTotal}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-neutral-900 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm tracking-wide cursor-pointer uppercase"
            >
              Pedir por WhatsApp 📱
            </button>
          </div>
        )}

      </div>
    </div>
  );
}