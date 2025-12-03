import React, { useState } from "react";
import { CirclePlus, Upload, X, DollarSign, Package, Save, Tag, Ban } from 'lucide-react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

export default function AgregarProducto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        priceEth: '',
        category: 'gpu', 
        image: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, image: null }));
        setPreviewUrl(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Producto listo para crear:\nNombre: ${formData.name}\nPrecio: ${formData.priceEth} ETH\nCategoría: ${formData.category}\nImagen: ${formData.image ? formData.image.name : 'Sin imagen'}`);
    };

    const categories = [
        { id: 'gpu', label: 'Tarjeta gráfica' },
        { id: 'cpu', label: 'Procesador' },
        { id: 'ram', label: 'Memoria RAM' },
        { id: 'storage', label: 'Disco duro' },
        { id: 'psu', label: 'Fuente de poder' },
        { id: 'case', label: 'Gabinete' },
    ];

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
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
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
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Imagen del Producto</label>
                            
                            {!previewUrl ? (
                                <div className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center hover:border-blue-500 hover:bg-slate-900/50 transition-all cursor-pointer relative group">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <div className="bg-slate-700 p-3 rounded-full mb-3 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                            <Upload size={24} className="text-slate-300 group-hover:text-blue-400" />
                                        </div>
                                        <p className="text-slate-300 font-medium">Haz clic o arrastra una imagen aquí</p>
                                        <p className="text-slate-500 text-sm mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden border border-slate-600 group">
                                    <img src={previewUrl} alt="Vista previa" className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform hover:scale-105 transition-all"
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
                                className="w-full sm:w-1/3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
                            >
                                <Ban size={20} />
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                <Save size={20} />
                                Guardar Producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}