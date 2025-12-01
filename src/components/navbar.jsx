import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/wzlogo.png"
import { ShoppingCart, Wallet, Cpu, Monitor, HardDrive, Zap, Menu, X } from 'lucide-react';

export default function Navbar({ walletAddress, connectWallet, cartCount }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                                <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-slate-800 border border-blue-500/30 flex items-center justify-center">
                                    <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                                    Shop<span className="text-blue-500"></span>
                                </span>
                            </Link>

                            <div className="hidden md:block">
                                <div className="flex items-baseline space-x-4">
                                    <Link to="/" className="text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                        Inicio
                                    </Link>
                                    <Link to="/catalogo" className="text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                        Catálogo
                                    </Link>
                                    <Link to="/pedidos" className="text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                        Mis Pedidos
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <button className="relative p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all duration-300 group">
                                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full shadow-lg shadow-blue-600/50">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={connectWallet}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 transform active:scale-95 ${walletAddress
                                        ? 'bg-slate-800 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40'
                                    }`}
                            >
                                <Wallet size={18} />
                                {walletAddress ? walletAddress : "Conectar Wallet"}
                            </button>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-blue-400 hover:bg-slate-800 focus:outline-none transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-fade-in-down">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Inicio</Link>
                            <Link to="/catalogo" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Catálogo</Link>
                            <Link to="/pedidos" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Mis Pedidos</Link>

                            <div className="pt-4 border-t border-slate-800 mt-2">
                                <button
                                    onClick={connectWallet}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                >
                                    <Wallet size={18} />
                                    {walletAddress ? walletAddress : "Conectar Wallet"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}