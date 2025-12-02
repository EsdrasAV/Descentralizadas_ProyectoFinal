import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Main from './main.jsx';
import Catalog from './productos/catalog.jsx';
import AgregarProducto from './productos/add.jsx';
import Pedidos from './pedidos.jsx';

export default function Shop() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [signer, setSigner] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Por favor, instala MetaMask para conectar tu wallet.");
            return;
        }
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const newSigner = await provider.getSigner();
            const address = await newSigner.getAddress();
            setSigner(newSigner);
            setWalletAddress(address);
        } catch (err) {
            console.error("Error al conectar la wallet:", err);
            alert("No se pudo conectar con MetaMask.");
        }
    };
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar
                walletAddress={walletAddress}
                connectWallet={connectWallet}
                cartCount={cartCount}
            />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/productos" 
                    element={<Catalog walletAddress={walletAddress} signer={signer}/>} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/productos/agregar" element={<AgregarProducto />} />
            </Routes>
            <Footer />
        </div>
    );
}