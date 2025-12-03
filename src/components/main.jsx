import React, { useState, useEffect, use } from "react";
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Globe, ArrowRight, ChevronLeft, ChevronRight, Truck, Lock, BadgeCheck, Wallet, Cpu, HardDrive, ShoppingCart, Package, Monitor } from 'lucide-react';
import metaMaskLogo from "../assets/images/metamasklogo.png";

export default function Main() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const mockData = [
            { id: 1, name: "NVIDIA RTX 4090", price: "0.85", seller: "0x71...9A23", category: "gpu" },
            { id: 2, name: "AMD Ryzen 9 7950X", price: "0.25", seller: "0x82...1B4C", category: "cpu" },
            { id: 3, name: "Corsair Dominator 64GB", price: "0.12", seller: "0x93...2C5D", category: "ram" },
            { id: 4, name: "Samsung 990 PRO 2TB", price: "0.08", seller: "0x14...3D6E", category: "storage" },
        ];
        setFeaturedProducts(mockData.slice(0, 4));
    }, []);

    const getIcon = (category) => {
        switch (category) {
            case 'gpu': return <Monitor size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            case 'cpu': return <Cpu size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            case 'ram':
            case 'storage': return <HardDrive size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            default: return <Package size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
        }
    };

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2574&auto=format&fit=crop",
            title: "POTENCIA TU JUEGO",
            subtitle: "Las mejores componentes para tu PC Gamer estan aquí."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2642&auto=format&fit=crop",
            title: "PAGOS CON ETHEREUM",
            subtitle: "Una tienda 100% descentralizada."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
            title: "ENVÍOS SEGUROS",
            subtitle: "Rastreo en tiempo real por Blockchain."
        }
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 25000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <div className="flex flex-col bg-slate-900 min-h-screen font-sans pt-16">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
                <div
                    className="w-full h-full flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div key={slide.id} className="min-w-full h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10" />
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute top-1/2 left-4 md:left-16 transform -translate-y-1/2 z-20 max-w-xl p-6">
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 italic uppercase tracking-wider">
                                    {slide.title}
                                </h2>
                                <p className="text-xl text-blue-400 font-medium mb-8 bg-black/30 backdrop-blur-sm p-2 inline-block rounded">
                                    {slide.subtitle}
                                </p>
                                <Link to="/catalogo">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/50">
                                        VER CATÁLOGO <ArrowRight size={20} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full z-30 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-3 rounded-full z-30 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-500 w-8' : 'bg-slate-500 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className="bg-[#111827] border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="py-6 flex items-center justify-center gap-4 px-4 hover:bg-slate-800/50 transition-colors">
                            <ShieldCheck size={32} className="text-blue-500 flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wide">Pagos 100% Seguros</h3>
                                <p className="text-slate-400 text-xs">Transacciones vía Smart Contract</p>
                            </div>
                        </div>
                        <div className="py-6 flex items-center justify-center gap-4 px-4 hover:bg-slate-800/50 transition-colors">
                            <Truck size={32} className="text-yellow-500 flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wide">Envíos Rápidos</h3>
                                <p className="text-slate-400 text-xs">A todo México y Latinoamerica</p>
                            </div>
                        </div>
                        <div className="py-6 flex items-center justify-center gap-4 px-4 hover:bg-slate-800/50 transition-colors">
                            <Wallet size={32} className="text-green-500 flex-shrink-0" />
                            <div className="text-left">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wide">MetaMask</h3>
                                <p className="text-slate-400 text-xs">Compra desde tu billetera de MetaMask</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-slate-900 text-center px-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    WZ Components Shop -<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"> 100% Seguro</span>
                </h2>
                <p className="max-w-2xl mx-auto text-slate-400 text-lg">
                    Tienda de hardware dedicada a un publico gamer y a entusiastas de la tecnología. Adquiere tus próximos componentes de gama alta con pagos en Ethereum.
                </p>
            </div>
            <div className="w-full mx-auto lg:px-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Productos Destacados</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((p) => (
                        <div key={p.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-500/10 group flex flex-col">
                            <div className="h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                                {getIcon(p.category)}
                                <span className="absolute top-2 right-2 bg-slate-900/80 text-xs text-slate-300 px-2 py-1 rounded border border-slate-700">
                                    ID: {p.id}
                                </span>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1" title={p.name}>{p.name}</h3>
                                <p className="text-slate-400 text-xs mb-4 truncate font-mono">
                                    Vendedor: {p.seller}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Precio</span>
                                        <span className="text-lg font-bold text-white flex items-center gap-1">
                                            {p.price} <span className="text-xs font-normal text-blue-400">ETH</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => alert(`Iniciando compra de: ${p.name}`)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-blue-600/20 text-sm"
                                    >
                                        <ShoppingCart size={16} />
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}