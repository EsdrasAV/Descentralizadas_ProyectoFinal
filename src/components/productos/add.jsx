import React, { useState } from "react";
import { CirclePlus, Upload, X, DollarSign, Package, Save, Tag, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";

import storeAbi from "../../../artifacts/contracts/Store.sol/Store.json";
import marketAbi from "../../../artifacts/contracts/Marketplace.sol/Marketplace.json";

const STORE_ADDRESS = import.meta.env.VITE_STORE_ADDRESS;
const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;

export default function AgregarProducto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        priceEth: '',
        category: 'GPU',
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const categories = [
        { id: 'gpu', label: 'Tarjeta gráfica', backend: 'GPU' },
        { id: 'cpu', label: 'Procesador', backend: 'CPU' },
        { id: 'ram', label: 'Memoria RAM', backend: 'RAM' },
        { id: 'motherboard', label: 'Tarjeta madre', backend: 'Motherboard' },
        { id: 'storage', label: 'Almacenamiento', backend: 'Storage' },
        { id: 'psu', label: 'Fuente de poder', backend: 'Power Supply' },
        { id: 'cooling', label: 'Refrigeración', backend: 'Cooling' },
        { id: 'case', label: 'Gabinete', backend: 'Case' },
        { id: 'peripherals', label: 'Periféricos', backend: 'Peripherals' },
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, image: null }));
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            alert("Debes seleccionar una imagen");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("priceEth", formData.priceEth);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("image", formData.image);
        try {
            const res = await fetch("http://localhost:3000/api/products/add", {
                method: "POST",
                body: formDataToSend
            });
            const data = await res.json();
            console.log("DATA:", data);
            if (!data.success) {
                alert("Error: " + data.message);
                return;
            }
            alert("Producto subido correctamente. IPFS: " + data.ipfsHash);
        } catch (err) {
            console.error("ERR:", err);
            alert("Error al enviar al servidor");
        }
    };


    return (
        <div className="bg-slate-900 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-6">
                    <CirclePlus className="text-blue-500" size={32} />
                    <h2 className="text-3xl font-bold text-white">Agregar Producto</h2>
                </div>
                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl">
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Nombre del Producto</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package className="text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Ej: NVIDIA RTX 4090"
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Precio (ETH)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        name="priceEth"
                                        value={formData.priceEth}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.0001"
                                        min="0"
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-slate-500 text-sm font-bold">ETH</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Categoría</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Tag className="text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    </div>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.backend} value={cat.backend}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Imagen del Producto</label>
                            {!previewUrl ? (
                                <div className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                    <Upload size={24} className="mx-auto text-slate-300" />
                                    <p className="text-slate-300 mt-2">Haz clic o arrastra una imagen aquí</p>
                                </div>
                            ) : (
                                <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden border border-slate-600 group">
                                    <img src={previewUrl} alt="Vista previa" className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            <X size={18} /> Eliminar imagen
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-1/3 bg-slate-700 text-slate-200 font-bold py-4 rounded-lg"
                            >
                                <Ban size={20} />
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {loading ? "Creando..." : "Guardar Producto"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}