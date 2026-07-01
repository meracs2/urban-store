import Link from 'next/link';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void; // Nueva función para avisar que se cliqueó el carrito
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-xl font-bold tracking-wider text-blue-500">
        URBAN STORE
      </div>
      <div className="flex gap-6 text-sm font-medium text-gray-300">
        <Link href="#" className="hover:text-white transition-colors">Inicio</Link>
        <Link href="#" className="hover:text-white transition-colors">Productos</Link>
        <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
      </div>
      {/* Al hacer clic, se activa la función onCartClick */}
      <button 
        onClick={onCartClick}
        className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium cursor-pointer transition-colors"
      >
        Carrito ({cartCount})
      </button>
    </nav>
  );
}