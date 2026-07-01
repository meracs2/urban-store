'use client';
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  priceString: string;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addItem: (item: any) => void;
  minusItem: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: any) => {
    if (!item) return;

    setCartItems((prev) => {
      const id = item.id;
      const existe = prev.find((i) => i.id === id);
      
      // 🛠️ MÁXIMA SEGURIDAD: Soporta si tu producto viene con 'price' o con 'precio'
      const valorPrecio = item.price !== undefined ? item.price : item.precio;
      const precioSeguro = valorPrecio !== undefined ? Number(valorPrecio) : 0;

      // Armamos el string del precio de forma manual y segura sin romper nada
      const priceString = item.priceString || `$${precioSeguro.toLocaleString('es-AR')}`;
      
      if (existe) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }

      return [...prev, {
        id: id,
        name: item.name || item.nombre || 'Producto sin nombre',
        price: precioSeguro,
        priceString: priceString,
        image: item.image || item.imagen || '',
        category: item.category || item.categoria || 'General',
        quantity: 1
      }];
    });
  };

  const minusItem = (id: number) => {
    setCartItems((prev) => {
      const existe = prev.find((i) => i.id === id);
      if (existe && existe.quantity === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, setIsCartOpen, addItem, minusItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
}