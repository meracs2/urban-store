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

  // FUNCIÓN PARA ENVIAR EL PEDIDO A WHATSAPP
  const handleCheckout = () => {
    // 1. Poné acá tu número de teléfono real (con código de país, sin el + ni el 15)
    // Ejemplo para Argentina: 549 + área + número (ej: 5493512345678)
    const tuTelefono = "5493512456648"; 

    // 2. Armamos el texto del mensaje ordenando los productos
    let mensaje = `¡Hola Urban Store! 👋 Quisiera hacer el siguiente pedido:\n\n`;
    
    cartItems.forEach((item) => {
      mensaje += `▪️ ${item.name} (x${item.quantity}) - ${item.priceString} c/u\n`;
    });

    mensaje += `\n💰 *Total Estimado: ${formattedTotal}*`;
    mensaje += `\n\n¿Tienen disponibilidad para coordinar el envío? 🙌`;

    // 3. Codificamos el texto para que sea válido en una URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // 4. Redireccionamos a la API de WhatsApp
    window.open(`https://wa.me/${tuTelefono}?text=${mensajeCodificado}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-gray-900 h-full shadow-2xl p-6 flex flex-col justify-between text-white border-l border-gray-800">
        
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-800">
            <h2 className="text-lg font-bold tracking-wide">Tu Carrito</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-sm font-semibold p-2 transition-colors">
              Cerrar ✕
            </button>
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-12">Tu carrito está vacío.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-950 p-3 rounded-lg border border-gray-800 relative group/item">
                  <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow pr-6">
                    <h4 className="text-sm font-medium text-gray-200 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.priceString} c/u</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => onMinusItem(item.id)} className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-xs font-bold transition-colors">-</button>
                      <span className="text-sm font-mono px-2 w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onAddItem(item)} className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-xs font-bold transition-colors">+</button>
                    </div>
                  </div>

                  <button onClick={() => onRemoveItem(item.id)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xs p-1 transition-colors">✕</button>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-800 pt-4 space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-gray-300">Total:</span>
              <span className="text-green-400 tracking-wide">{formattedTotal}</span>
            </div>
            {/* Agregamos el onClick ejecutor de WhatsApp acá */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors shadow-lg"
            >
              Iniciar Pago (WhatsApp)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}