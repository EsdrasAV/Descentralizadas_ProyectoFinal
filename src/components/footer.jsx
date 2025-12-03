import React from "react";
import logo from "../assets/images/wzlogo.png"

export default function Footer() {
    return (
        <div className="bg-slate-900 p-4">
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="p-1 h-16 w-16 flex items-center justify-center">
                            <img src={logo} alt="WZComponents" className="h-full w-full object-contain" />
                        </div>
                        <p className="text-slate-400 text-sm">© 2025 WZ Components Shop. Blockchain Commerce.</p>
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