"use client";

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white pb-20 md:pb-0">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-50 -z-10 transform -skew-y-6 origin-top-left scale-110"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-fade-in">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            Nouveau : Analyse 3D par IA disponible
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                            L'Usinage CNC <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Nouvelle Génération
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Obtenez vos pièces sur-mesure en quelques clics. Uploadez vos fichiers 3D, recevez un devis instantané et lancez la production en Algérie.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/devis" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105 flex items-center justify-center gap-2">
                                Obtenir un devis
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/reseau" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                                Voir les ateliers
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                                title="Devis Instantané"
                                desc="Notre IA analyse vos fichiers 3D en temps réel pour calculer le prix exact."
                            />
                            <FeatureCard
                                icon={<Shield className="w-6 h-6 text-blue-500" />}
                                title="Qualité Garantie"
                                desc="Chaque pièce est inspectée. Satisfait ou refabriqué gratuitement."
                            />
                            <FeatureCard
                                icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                                title="Réseau Certifié"
                                desc="Accès aux meilleurs ateliers CNC d'Algérie, audités et certifiés."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}
