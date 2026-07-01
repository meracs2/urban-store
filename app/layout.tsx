'use client';
import './globals.css';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import { CartProvider, useCart } from './components/CartContext';

function LayoutComponent({ children }: { children: React.ReactNode }) {
  const { cartItems, isCartOpen, setIsCartOpen, addItem, minusItem, removeItem } = useCart();
  const totalItemsEnCarrito = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <body className="bg-[#fcfbf9]">
      <Navbar 
        cartCount={totalItemsEnCarrito} 
        onCartClick={() => setIsCartOpen(true)} 
      /> 
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onAddItem={addItem}
        onMinusItem={minusItem}
        onRemoveItem={removeItem}
      />

      <main>{children}</main>
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <CartProvider>
        <LayoutComponent>{children}</LayoutComponent>
      </CartProvider>
    </html>
  );
}