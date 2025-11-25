"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Viewer3D from '@/components/Viewer3D';
import DFMAnalysis from '@/components/DFMAnalysis';
import { parseSTLFile, GeometryData } from '@/lib/analysis-3d';
import { saveQuote } from '@/lib/supabase-client';
import { Upload, FileCode, Loader2, Save, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export default function QuotePage() {
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');
    const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
    const [fileData, setFileData] = useState<{ name: string; size: number } | null>(null);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [geometryData, setGeometryData] = useState<GeometryData | null>(null);
    const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
    const [email, setEmail] = useState('');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadStatus('uploading');
        setFileData({ name: file.name, size: file.size });

        try {
            const buffer = await file.arrayBuffer();
            setFileBuffer(buffer);

            const data = await parseSTLFile(buffer, file.name);

            const loader = new STLLoader();
            const geo = loader.parse(buffer);
            setGeometry(geo);

            setGeometryData(data);
            setUploadStatus('complete');

            setAnalysisStatus('analyzing');
            setTimeout(() => {
                setAnalysisStatus('complete');
            }, 1500);

        } catch (error) {
            console.error('Error processing file:', error);
            setUploadStatus('idle');
            alert('Erreur lors de la lecture du fichier.');
        }
    };

    const handleSaveQuote = async () => {
        if (!email || !geometryData || !fileData) {
            alert('Veuillez saisir votre email');
            return;
        }

        setSaveStatus('saving');

        try {
            const quoteData = {
                user_id: '00000000-0000-0000-0000-000000000000',
                file_name: fileData.name,
                geometry_data: geometryData,
                dfm_analysis: { score: 85, recommendations: geometryData.recommendations },
                config: { email: email, material: 'Aluminium 6061', finish: 'Anodisé', delivery: 'J+3' },
                price_breakdown: { total: 12450, currency: 'DA' },
                status: 'draft' as const
            };

            await saveQuote(quoteData);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);

        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            alert('Erreur lors de la sauvegarde.');
            setSaveStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-black text-slate-900">Devis Instantané</h1>
                        {uploadStatus === 'idle' ? (
                            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer relative group">
                                <input type="file" accept=".stl" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} />
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Glissez votre fichier 3D</h3>
                                <p className="text-slate-500 mb-6">Format supporté : .STL (Max 50MB)</p>
                                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">Parcourir les fichiers</button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-[500px] relative">
                                <Viewer3D fileBuffer={fileBuffer} fileName={fileData?.name || ''} geometry={geometry} />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <FileCode className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{fileData?.name}</div>
                                        <div className="text-xs text-slate-500">{(fileData!.size / 1024 / 1024).toFixed(2)} MB</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        {uploadStatus === 'idle' ? (
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center h-full flex flex-col items-center justify-center opacity-50">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Loader2 className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">En attente de fichier</h3>
                                <p className="text-slate-500">Uploadez un modèle 3D pour voir l'analyse et le prix.</p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-slide-up">
                                <DFMAnalysis data={geometryData} status={analysisStatus} />
                                {analysisStatus === 'complete' && (
                                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="text-slate-400 text-sm font-medium mb-1">Prix Estimé</div>
                                                <div className="text-4xl font-black">12,450 <span className="text-xl text-slate-400">DA</span></div>
                                            </div>
                                            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">Livraison J+3</div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Votre email (pour recevoir le devis)</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votreemail@exemple.com" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                                        </div>
                                        <button onClick={handleSaveQuote} disabled={saveStatus === 'saving' || saveStatus === 'saved'} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${saveStatus === 'saved' ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'} disabled:opacity-70`}>
                                            {saveStatus === 'saving' && (<><Loader2 className="w-5 h-5 animate-spin" />Sauvegarde...</>)}
                                            {saveStatus === 'saved' && (<><CheckCircle className="w-5 h-5" />Devis sauvegardé !</>)}
                                            {saveStatus === 'idle' && (<><Save className="w-5 h-5" />Sauvegarder le devis</>)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
