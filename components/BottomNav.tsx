"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, Factory, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 z-50 safe-area-bottom">
            <div className="flex justify-between items-center">
                <Link href="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-blue-600' : 'text-slate-400'}`}>
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Accueil</span>
                </Link>

                <Link href="/devis" className={`flex flex-col items-center gap-1 ${isActive('/devis') ? 'text-blue-600' : 'text-slate-400'}`}>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 -mt-6 border-4 border-white">
                        <PlusCircle className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600">Devis</span>
                </Link>

                <Link href="/reseau" className={`flex flex-col items-center gap-1 ${isActive('/reseau') ? 'text-blue-600' : 'text-slate-400'}`}>
                    <Factory className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Réseau</span>
                </Link>

                <Link href="/profil" className={`flex flex-col items-center gap-1 ${isActive('/profil') ? 'text-blue-600' : 'text-slate-400'}`}>
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Profil</span>
                </Link>
            </div>
        </nav>
    );
}
