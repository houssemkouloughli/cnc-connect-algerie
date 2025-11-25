"use client";

import { TriangleAlert, CheckCircle, Info, ThumbsUp, Tool } from 'lucide-react';
import { GeometryData } from '@/lib/analysis-3d';

interface DFMAnalysisProps {
    data: GeometryData | null;
    status: 'idle' | 'analyzing' | 'complete';
}

export default function DFMAnalysis({ data, status }: DFMAnalysisProps) {
    if (status === 'idle') return null;

    if (status === 'analyzing') {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
                    <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-20 bg-slate-100 rounded-xl"></div>
                    <div className="h-20 bg-slate-100 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    // Calcul du score DFM (logique simplifiée pour l'affichage, le vrai calcul est dans analysis-3d.ts)
    const score = 85; // À remplacer par data.dfmScore si disponible

    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (s >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Analyse DFM
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(score)}`}>
                    Score: {score}/100
                </div>
            </div>

            {/* Dimensions & Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-500 font-medium mb-1">Dimensions</div>
                    <div className="text-sm font-bold text-slate-900">{data.dimensions}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-500 font-medium mb-1">Volume</div>
                    <div className="text-sm font-bold text-slate-900">{data.volume.toFixed(1)} cm³</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-500 font-medium mb-1">Surface</div>
                    <div className="text-sm font-bold text-slate-900">{data.surfaceArea} cm²</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-500 font-medium mb-1">Complexité</div>
                    <div className="text-sm font-bold text-slate-900">{data.complexity.level}</div>
                </div>
            </div>

            {/* Recommandations */}
            <div className="space-y-3">
                {data.recommendations.map((rec, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex gap-3 ${rec.type === 'warning' ? 'bg-orange-50 border-orange-100' :
                        rec.type === 'success' ? 'bg-green-50 border-green-100' :
                            'bg-blue-50 border-blue-100'
                        }`}>
                        <div className={`mt-0.5 ${rec.type === 'warning' ? 'text-orange-600' :
                            rec.type === 'success' ? 'text-green-600' :
                                'text-blue-600'
                            }`}>
                            {rec.type === 'warning' ? <TriangleAlert className="w-5 h-5" /> :
                                rec.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                    <Info className="w-5 h-5" />}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 mb-0.5">{rec.title}</div>
                            <div className="text-sm text-slate-600">{rec.message}</div>
                            <div className="mt-2 text-xs font-medium flex gap-3">
                                <span className="text-slate-500">Impact: <span className="text-slate-900">{rec.impact}</span></span>
                                <span className="text-slate-500">Solution: <span className="text-slate-900">{rec.solution}</span></span>
                            </div>
                        </div>
                    </div>
                ))}

                {data.recommendations.length === 0 && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex gap-3">
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                        <div>
                            <div className="text-sm font-bold text-slate-900">Conception Optimale</div>
                            <div className="text-sm text-slate-600">Aucun problème majeur détecté. Votre pièce est prête pour la fabrication.</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
