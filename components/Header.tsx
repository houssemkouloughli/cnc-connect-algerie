"use client";

import Link from 'next/link';
import { Menu, X, Phone, User, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                            C
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                                CNC<span className="text-blue-600">CONNECT</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Algérie</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Accueil</Link>
                        <Link href="/devis" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Devis Instantané</Link>
                        <Link href="/reseau" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Réseau Ateliers</Link>
                        <Link href="/formations" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Académie</Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="tel:+213555555555" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-medium">0555 55 55 55</span>
                        </a>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
                            <User className="w-4 h-4" />
                            <span>Connexion</span>
                        </button>
                        <Link href="/devis" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                            <span>Créer un devis</span>
                            <LogIn className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white">
                    <div className="px-4 py-6 space-y-4">
                        <Link href="/" className="block px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium">Accueil</Link>
                        <Link href="/devis" className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">Devis Instantané</Link>
                        <Link href="/reseau" className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">Réseau Ateliers</Link>
                        <Link href="/formations" className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">Académie</Link>
                        <div className="border-t border-slate-100 my-4 pt-4">
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20">
                                <User className="w-4 h-4" />
                                <span>Connexion / Inscription</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
