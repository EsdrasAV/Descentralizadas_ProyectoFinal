import React, { useState, useEffect } from "react";
import { ShoppingCart, Loader, Package, Cpu, Monitor, HardDrive, Search, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import storeAbi from "../../../artifacts/contracts/Store.sol/Store.json";
import marketAbi from "../../../artifacts/contracts/Marketplace.sol/Marketplace.json";
const STORE_ADDRESS = import.meta.env.VITE_STORE_ADDRESS;
const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products");
                const data = await response.json();
                setProducts(Array.isArray(data.products) ? data.products : []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { id: 'all', label: 'Todo', backend: null },
        { id: 'gpu', label: 'Tarjetas gráficas', backend: 'GPU' },
        { id: 'cpu', label: 'Procesadores', backend: 'CPU' },
        { id: 'ram', label: 'Memorias RAM', backend: 'RAM' },
        { id: 'motherboard', label: 'Tarjetas madre', backend: 'Motherboard' },
        { id: 'storage', label: 'Almacenamiento', backend: 'Storage' },
        { id: 'psu', label: 'Fuentes de poder', backend: 'Power Supply' },
        { id: 'cooling', label: 'Refrigeración', backend: 'Cooling' },
        { id: 'case', label: 'Gabinetes', backend: 'Case' },
        { id: 'peripherals', label: 'Periféricos', backend: 'Peripherals' },
    ];

    const getIcon = (category) => {
        switch (category) {
            case "GPU": return <Monitor size={64} className="text-slate-600 group-hover:text-blue-500" />;
            case "CPU": return <Cpu size={64} className="text-slate-600 group-hover:text-blue-500" />;
            case "RAM":
            case "Storage":
            case "Power Supply":
            case "Cooling":
            case "Motherboard":
                return <HardDrive size={64} className="text-slate-600 group-hover:text-blue-500" />;
            case "Case":
            case "Peripherals":
                return <Package size={64} className="text-slate-600 group-hover:text-blue-500" />;
            default:
                return <Package size={64} className="text-slate-600 group-hover:text-blue-500" />;
        }
    };

    const fetchProductsByCategory = async (backendCategory) => {
        try {
            setLoading(true);
            const url = backendCategory
                ? `http://localhost:3000/api/products/category/${backendCategory}`
                : `http://localhost:3000/api/products`;
            const response = await fetch(url);
            const data = await response.json();
            setProducts(Array.isArray(data.products) ? data.products : []);
        } catch (err) {
            console.error("Error:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const buyProduct = async (productId, price) => {
        try {
            if (price === undefined || price === null || price === "") {
                console.error("Precio inválido:", price);
                alert("Error: este producto no tiene precio válido");
                return;
            }
            const normalizedPrice = String(price);
            if (!window.ethereum) {
                alert("Instala MetaMask");
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const store = new ethers.Contract(STORE_ADDRESS, storeAbi.abi, signer);
            const tx = await store.buyProduct(productId, {
                value: ethers.utils.parseEther(normalizedPrice)
            });
            await tx.wait();
            alert("Compra realizada correctamente");
        } catch (err) {
            console.error("BUY ERROR:", err);
            alert("Error al comprar");
        }
    };

    const getImageUrl = (hash) => {
        if (!hash) return null;
        return `https://gateway.pinata.cloud/ipfs/${hash}`;
    };

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
                                className="w-full sm:w-64 bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg"
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
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    fetchProductsByCategory(cat.backend);
                                }}
                                className={`px-4 py-1.5 rounded-full text-sm transition-all ${selectedCategory === cat.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <Link
                        to="/productos/agregar"
                        className="px-4 py-1.5 rounded-full text-sm font-bold bg-green-600/10 text-blue-400 border border-blue-600/50 hover:bg-blue-600 hover:text-white"
                    >
                        Agregar Producto
                    </Link>
                </div>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 gap-4">
                        <Loader size={40} className="text-blue-500 animate-spin" />
                        <p className="text-slate-400">Cargando productos...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(p => (
                            <div key={p.id} className="bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all shadow-lg group flex flex-col">
                                <div className="h-48 bg-slate-900 flex items-center justify-center relative">
                                    {p.image ? (
                                        <img
                                            src={getImageUrl(p.image)}
                                            alt={p.name}
                                            className="w-full h-full object-contain p-4"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        getIcon(p.category)
                                    )}
                                    <span className="absolute top-2 right-2 bg-slate-900/80 text-xs text-slate-300 px-2 py-1 rounded border border-slate-700">
                                        ID: {p.id}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                                    <p className="text-slate-400 text-xs mb-4">Vendedor: {p.seller}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase">Precio</span>
                                            <span className="text-lg font-bold text-white">{p.price} ETH</span>
                                        </div>
                                        <button
                                            onClick={() => buyProduct(p.id, p.price)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold flex items-center gap-2"
                                        >
                                            <ShoppingCart size={16} /> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}