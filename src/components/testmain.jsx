import React, { useState } from 'react';
import { ShoppingCart, Wallet, Cpu, Monitor, HardDrive, Zap, Menu, X } from 'lucide-react';

// Datos de ejemplo para los productos
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "NVIDIA RTX 4090 Founder's Edition",
        category: "GPU",
        price: 0.85, // Precio en ETH
        image: "gpu",
        stock: 5
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        category: "CPU",
        price: 0.25,
        image: "cpu",
        stock: 12
    },
    {
        id: 3,
        name: "Corsair Dominator 64GB DDR5",
        category: "RAM",
        price: 0.12,
        image: "ram",
        stock: 20
    },
    {
        id: 4,
        name: "Samsung 990 PRO 2TB NVMe",
        category: "Storage",
        price: 0.08,
        image: "ssd",
        stock: 15
    },
    {
        id: 5,
        name: "ASUS ROG Thor 1200W",
        category: "PSU",
        price: 0.15,
        image: "psu",
        stock: 8
    },
    {
        id: 6,
        name: "Lian Li O11 Dynamic EVO",
        category: "Case",
        price: 0.09,
        image: "case",
        stock: 10
    }
];

export default function CryptoStore() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Simulación de conexión de wallet (solo frontend)
    const connectWallet = () => {
        // Aquí iría la lógica con window.ethereum (Metamask) o Wagmi
        setWalletAddress("0x71C...9A23");
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    // Renderizado condicional de iconos
    const renderProductIcon = (type) => {
        switch (type) {
            case 'gpu': return <Monitor className="w-12 h-12 text-purple-400" />;
            case 'cpu': return <Cpu className="w-12 h-12 text-blue-400" />;
            case 'ram': return <HardDrive className="w-12 h-12 text-green-400" />;
            default: return <Zap className="w-12 h-12 text-yellow-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg">
                                <Cpu size={24} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">Crypto<span className="text-purple-400">Components</span></span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                                <a href="#" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Catálogo</a>
                                <a href="#" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Mis Pedidos</a>
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="hidden md:flex items-center gap-4">
                            <button className="relative p-2 hover:bg-slate-800 rounded-full transition-colors group">
                                <ShoppingCart size={22} className="group-hover:text-purple-400 transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={connectWallet}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${walletAddress
                                        ? 'bg-slate-800 text-purple-400 border border-purple-500/30'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20'
                                    }`}
                            >
                                <Wallet size={18} />
                                {walletAddress ? walletAddress : "Conectar Wallet"}
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-800 border-b border-slate-700">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Inicio</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Catálogo</a>
                            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Mis Pedidos</a>
                            <button
                                onClick={connectWallet}
                                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:bg-slate-700"
                            >
                                <Wallet size={18} />
                                {walletAddress ? walletAddress : "Conectar Wallet"}
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
                        Hardware de Alto Rendimiento <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                            Descentralizado
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-8">
                        Adquiere los mejores componentes para tu PC pagando directamente con Ethereum a través de la red Sepolia. Sin intermediarios, seguro y rápido.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/25">
                            Ver Catálogo
                        </button>
                        <button className="px-8 py-3 rounded-full bg-slate-800 text-white font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-all">
                            Leer Contrato
                        </button>
                    </div>
                </div>

                {/* Decorative background blobs */}
                <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Componentes Destacados</h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full border border-purple-500/20">Sepolia Network</span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full border border-green-500/20">Live Status</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_PRODUCTS.map((product) => (
                        <div key={product.id} className="group bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10">

                            {/* Image Placeholder */}
                            <div className="h-48 bg-slate-800 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors relative">
                                {renderProductIcon(product.image)}
                                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-slate-300">
                                    Stock: {product.stock}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{product.category}</span>
                                        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">{product.name}</h3>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-400">Precio</span>
                                        <span className="text-xl font-bold text-white flex items-center gap-1">
                                            {product.price} <span className="text-sm font-normal text-slate-400">ETH</span>
                                        </span>
                                    </div>

                                    <button
                                        onClick={addToCart}
                                        className="bg-white text-slate-900 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform active:scale-95"
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-800 p-2 rounded-lg">
                            <Cpu size={20} className="text-purple-500" />
                        </div>
                        <p className="text-slate-400 text-sm">© 2024 CryptoComponents. Blockchain Commerce.</p>
                    </div>
                    <div className="flex gap-6 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Smart Contract</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}