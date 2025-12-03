import React, { useState } from "react";

export default function Pedidos() {
    const [orders, setOrders] = useState([
        { id: 1, date: '2024-01-15', total: '0.5 ETH', status: 'Enviado' },
        { id: 2, date: '2024-02-20', total: '1.2 ETH', status: 'Procesando' },
    ]);

    return (
        <div className="bg-slate-900 min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-[1600px] mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Mis Pedidos</h1>
                {orders.length === 0 ? (
                    <p className="text-slate-400">No tienes pedidos realizados.</p> 
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-800 rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-slate-700 text-left text-sm font-semibold text-slate-300">ID del Pedido</th>
                                    <th className="px-6 py-3 border-b border-slate-700 text-left text-sm font-semibold text-slate-300">Fecha</th>
                                    <th className="px-6 py-3 border-b border-slate-700 text-left text-sm font-semibold text-slate-300">Total</th>
                                    <th className="px-6 py-3 border-b border-slate-700 text-left text-sm font-semibold text-slate-300">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="bg-slate-900 hover:bg-slate-700 transition-colors">
                                        <td className="px-6 py-4 border-b border-slate-700 text-slate-200">{order.id}</td>
                                        <td className="px-6 py-4 border-b border-slate-700 text-slate-200">{order.date}</td>
                                        <td className="px-6 py-4 border-b border-slate-700 text-slate-200">{order.total}</td>
                                        <td className="px-6 py-4 border-b border-slate-700 text-slate-200">{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}