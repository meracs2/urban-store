import Link from 'next/link';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="w-full bg-[#fcfbf9]/90 backdrop-blur-md border-b border-neutral-200/60 text-neutral-800 px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      
      {/* LOGO */}
      <div className="text-xl font-black tracking-wider text-neutral-900 uppercase">
        URBAN <span className="text-amber-800">STORE</span>
      </div>
      
      {/* MENÚ DE NAVEGACIÓN */}
      <div className="flex gap-6 text-sm font-semibold text-neutral-600">
        <Link href="/" className="hover:text-amber-800 transition-colors">
          Inicio
        </Link>
        <Link href="/productos" className="hover:text-amber-800 transition-colors">
          Productos
        </Link>
        <Link href="/contacto" className="hover:text-amber-800 transition-colors">
          Contacto
        </Link>
      </div>
      
      {/* BOTÓN CARRITO */}
      <button 
        onClick={onCartClick}
        className="text-xs bg-neutral-900 hover:bg-amber-800 text-white px-4 py-2 rounded-xl font-semibold cursor-pointer transition-colors shadow-sm active:scale-95 flex items-center gap-1.5"
      >
        <span>Carrito</span>
        <span className="bg-white text-neutral-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[18px] text-center">
          {cartCount}
        </span>
      </button>

    </nav>
  );
}