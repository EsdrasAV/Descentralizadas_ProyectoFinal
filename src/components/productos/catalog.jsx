import React, { useState, useEffect } from "react";
import { ShoppingCart, AlertCircle, Loader, Package, Cpu, Monitor, HardDrive, Search, Filter, X } from 'lucide-react';
import { Link } from "react-router-dom";
import AgregarProducto from "./add";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        setTimeout(() => {
            setProducts([
                { id: 1, name: "NVIDIA RTX 4090", price: "0.85", seller: "0x71...9A23", category: "gpu" },
                { id: 2, name: "AMD Ryzen 9 7950X", price: "0.25", seller: "0x82...1B4C", category: "cpu" },
                { id: 3, name: "Corsair Dominator 64GB", price: "0.12", seller: "0x93...2C5D", category: "ram" },
                { id: 4, name: "Samsung 990 PRO 2TB", price: "0.08", seller: "0x14...3D6E", category: "storage" },
                { id: 5, name: "ASUS ROG Thor 1200W", price: "0.15", seller: "0x25...4E7F", category: "psu" },
                { id: 6, name: "Lian Li O11 Dynamic", price: "0.09", seller: "0x36...5F8G", category: "case" },
                { id: 7, name: "RTX 4080 Super", price: "0.65", seller: "0x99...1A2B", category: "gpu" },
                { id: 8, name: "Intel Core i9-14900K", price: "0.28", seller: "0x88...2B3C", category: "cpu" },
            ]);
            setLoading(false);
        }, 1500);
    }, []);
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const getIcon = (category) => {
        switch (category) {
            case 'gpu': return <Monitor size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            case 'cpu': return <Cpu size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            case 'ram':
            case 'storage': return <HardDrive size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
            default: return <Package size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" />;
        }
    }
    const categories = [
        { id: 'all', label: 'Todo' },
        { id: 'gpu', label: 'Tarjetas gráficas' },
        { id: 'cpu', label: 'Procesadores' },
        { id: 'ram', label: 'Memorias RAM' },
        { id: 'storage', label: 'Discos duro' },
        { id: 'psu', label: 'Fuentes de poder' },
        { id: 'case', label: 'Gabinetes' },
    ];

    return (
        <div className="bg-slate-900 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-700 pb-6">
                    <div className="flex items-center gap-3">
                        <Package className="text-blue-500" size={32} />
                        <h2 className="text-3xl font-bold text-white">Productos</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64 bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat.id 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <Link to="/productos/agregar" className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-green-600/10 text-blue-400 border border-blue-600/50 hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-600/20">
                        Agregar Producto
                    </Link>
                </div>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 gap-4">
                        <Loader size={40} className="text-blue-500 animate-spin" />
                        <p className="text-slate-400 animate-pulse">Cargando productos desde la Blockchain...</p>
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 text-slate-500 bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                                <button onClick={() => { setSearchTerm(""); setSelectedCategory("all") }} className="text-blue-400 mt-2 hover:underline">Limpiar filtros</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((p) => (
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
}