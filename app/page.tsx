"use client";

import { useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';

interface Product {
  id: number;
  name: string;
  price: number;
  priceString: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Campera Bomber Oversize', price: 45000, priceString: '$45.000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60', category: 'Abrigos' },
  { id: 2, name: 'Buzo Hoodie Black Sinner', price: 32000, priceString: '$32.000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60', category: 'Buzos' },
  { id: 3, name: 'Remera Heavy Cotton Acid Wash', price: 18500, priceString: '$18.500', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60', category: 'Remeras' },
  { id: 4, name: 'Pantalón Cargo Parachute', price: 38000, priceString: '$38.000', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60', category: 'Pantalones' },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 1. Agregar o sumar cantidad
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 2. Restar 1 a la cantidad (si llega a 0, se elimina solo)
  const minusFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      // Si le queda 1 sola unidad y restan, lo borramos directamente
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // 3. Borrar el producto completo sin importar la cantidad
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      {/* Pasamos las nuevas funciones al CartDrawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onAddItem={addToCart}
        onMinusItem={minusFromCart}
        onRemoveItem={removeFromCart}
      />

      <header className="text-center my-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-100">
          Nueva Colección Urbana
        </h1>
        <p className="mt-4 text-base text-gray-400 max-w-xl mx-auto">
          Cortes oversize, telas pesadas y el estilo que estabas buscando para la calle.
        </p>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-lg">
            <div className="aspect-square w-full bg-gray-800 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 left-2 bg-blue-600 text-xs font-semibold px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-200 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                <p className="mt-2 text-xl font-bold text-gray-100">{product.priceString}</p>
              </div>
              <button onClick={() => addToCart(product)} className="mt-4 w-full bg-gray-800 hover:bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-md transition-colors duration-200">
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}