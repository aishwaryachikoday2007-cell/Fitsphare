'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Scan,
  Camera,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Video,
  Play,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dumbbell
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialEquipment } from '@/lib/mockData';

interface AnalysisResult {
  identified: boolean;
  equipmentName?: string;
  category?: string;
  confidence?: number;
  targetMuscles?: string[];
  secondaryMuscles?: string[];
  difficulty?: string;
  purpose?: string;
  benefits?: string[];
  setupSteps?: string[];
  postureGrip?: string;
  commonMistakes?: string[];
  safetyPrecautions?: string[];
  alternatives?: string[];
  videoEmbedUrl?: string;
  equipmentId?: string;
  reason?: string;
}

export default function EquipmentAiPage() {
  const { toggleSaveEquipment, user } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFilename, setImageFilename] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch {
      setCameraError('Camera access was denied or not supported by this browser. You can still upload any gym photo below!');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSelectedImage(dataUrl);
      setImageFilename('camera_capture.jpg');
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFilename(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const selectPresetSample = (item: typeof initialEquipment[0]) => {
    setSelectedImage(item.imageUrl);
    setImageFilename(`${item.id}.jpg`);
    setResult(null);
    stopCamera();
  };

  const runIdentification = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const res = await fetch('/api/identify-equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          filename: imageFilename
        })
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        identified: false,
        reason: 'Network error analyzing image. Please verify connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageFilename('');
    setResult(null);
    stopCamera();
  };

  const isSaved = result?.equipmentId ? user.savedEquipmentIds.includes(result.equipmentId) : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Computer Vision Biomechanics Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          AI Gym Equipment Recognition
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl">
          Point your device camera at any gym machine or upload a photo. FitSphere AI detects the equipment, target muscles, setup cues, safety precautions, and correct movement technique.
        </p>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload / Camera Panel (Left 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Capture or Upload Machine</span>
            </h2>

            {/* Camera Viewport or Image Preview */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              {isCameraActive ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-emerald-400/50 pointer-events-none rounded-xl" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <button
                      onClick={capturePhoto}
                      className="px-5 py-2.5 rounded-full bg-emerald-500 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition-all"
                    >
                      Take Snapshot
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-2.5 rounded-full bg-zinc-800 text-white font-bold text-xs hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="relative w-full h-full group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedImage}
                    alt="Equipment to identify"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={clearImage}
                      className="px-2.5 py-1 rounded-lg bg-black/80 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-zinc-400">
                    No image selected. Take a live photo or upload from your device.
                  </div>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startCamera}
                disabled={isCameraActive}
                className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Use Camera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Browse File</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={runIdentification}
              disabled={!selectedImage || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Analyzing Machine Biomechanics...</span>
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 text-black" />
                  <span>Identify Equipment</span>
                </>
              )}
            </button>

            {/* Preset Samples */}
            <div className="pt-3 border-t border-zinc-800">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                Quick Test Samples (Click to test):
              </div>
              <div className="grid grid-cols-3 gap-2">
                {initialEquipment.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectPresetSample(item)}
                    className="p-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500 text-left transition-all group overflow-hidden"
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-[10px] font-semibold text-zinc-300 truncate">
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Results Dashboard (Right 7 Cols) */}
        <div className="lg:col-span-7">
          {result && result.identified ? (
            <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-6 animate-in fade-in duration-300">
              
              {/* Header Match Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase">
                      {result.category} Equipment
                    </span>
                    <span className="text-xs text-zinc-400">
                      Difficulty: <strong className="text-white">{result.difficulty}</strong>
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{result.equipmentName}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-emerald-500/40 text-center">
                    <div className="text-xs text-zinc-400">Confidence</div>
                    <div className="text-base font-black text-emerald-400">{result.confidence}%</div>
                  </div>

                  {result.equipmentId && (
                    <button
                      onClick={() => toggleSaveEquipment(result.equipmentId!)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-emerald-500 text-black border-emerald-500'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                      }`}
                      title={isSaved ? 'Saved to Routine' : 'Save to Routine'}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Purpose & Target Muscles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Target Muscles (Primary)</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {result.targetMuscles?.map((m, i) => (
                      <span key={i} className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Secondary Muscles
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {result.secondaryMuscles?.map((m, i) => (
                      <span key={i} className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purpose text */}
              <div className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                <strong className="text-white block mb-1">Equipment Purpose:</strong>
                {result.purpose}
              </div>

              {/* Step-by-Step Setup */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct Machine Setup & Posture</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {result.setupSteps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-zinc-300 leading-normal">{step}</span>
                    </div>
                  ))}
                </div>
                {result.postureGrip && (
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-emerald-400">Grip & Posture Cue: </strong>
                    {result.postureGrip}
                  </div>
                )}
              </div>

              {/* Common Mistakes & Safety */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-rose-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Common Form Mistakes</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                    {result.commonMistakes?.map((m, i) => (
                      <li key={i} className="leading-snug">{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Safety Precautions</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                    {result.safetyPrecautions?.map((s, i) => (
                      <li key={i} className="leading-snug">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Busy Machine Alternatives */}
              {result.alternatives && result.alternatives.length > 0 && (
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Machine Occupied? Try These Substitutes:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.alternatives.map((alt, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 font-medium">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Embed */}
              {result.videoEmbedUrl && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>Official Biomechanics Video Tutorial</span>
                  </h4>
                  <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <iframe
                      src={result.videoEmbedUrl}
                      title={result.equipmentName}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Bottom Quick Action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/workouts"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1.5"
                >
                  <span>Add To Today&apos;s Workout Routine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/exercises"
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Explore Complete Video Library →
                </Link>
              </div>

            </div>
          ) : result && !result.identified ? (
            /* Unclear image fallback */
            <div className="rounded-2xl bg-zinc-900/70 border border-amber-500/30 p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Equipment Not Clearly Recognized</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                {result.reason || 'The uploaded photo was unclear, dimly lit, or did not match known gym equipment. Please capture the machine frame clearly from a 2 to 3 meter distance.'}
              </p>
              <button
                onClick={clearImage}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold"
              >
                Upload Another Photo
              </button>
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 p-12 text-center space-y-4 min-h-[480px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600">
                <Scan className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Ready for Machine Recognition</h3>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Upload an image or choose one of the quick test presets on the left to reveal complete biomechanics details.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
