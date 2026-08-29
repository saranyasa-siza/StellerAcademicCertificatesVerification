import React, { useState } from 'react'
import { Sparkles, RotateCcw, ChevronDown, ChevronUp, Sun, Moon, Eye, ZoomIn } from 'lucide-react'
import {
  GravityParticlesConfig,
  ParticleMode,
  ColorPreset,
  BackgroundTheme,
  DEFAULT_PARTICLE_CONFIG,
} from './GravityParticles'

interface Props {
  config: GravityParticlesConfig
  onChange: (updated: GravityParticlesConfig) => void
}

export default function ParticleControls({ config, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleModeChange = (mode: ParticleMode) => {
    onChange({ ...config, mode })
  }

  const handlePresetChange = (colorPreset: ColorPreset) => {
    onChange({ ...config, colorPreset })
  }

  const handleBgThemeChange = (backgroundTheme: BackgroundTheme) => {
    onChange({ ...config, backgroundTheme })
  }

  const resetDefaults = () => {
    onChange({ ...DEFAULT_PARTICLE_CONFIG })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Control Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-2xl p-4 text-slate-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              Gravity Particles & Space Zoom
            </div>
            <button
              onClick={resetDefaults}
              title="Reset Defaults"
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Interaction Mode */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Interaction Mode</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {config.mode}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {(['attract', 'repel', 'float'] as ParticleMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`py-1.5 rounded-lg font-medium capitalize transition-all text-center ${
                      config.mode === mode
                        ? 'bg-cyan-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Fast Zoom In/Out Scale Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Hover Zoom Scale
                </span>
                <span className="text-cyan-400 font-mono">{config.zoomIntensity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.5"
                step="0.1"
                value={config.zoomIntensity}
                onChange={(e) => onChange({ ...config, zoomIntensity: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Canvas Backdrop Theme */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Space Backdrop</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {(
                  [
                    { id: 'dark', label: 'Dark Space', icon: <Moon className="w-3 h-3" /> },
                    { id: 'navy', label: 'Deep Navy', icon: <Sun className="w-3 h-3" /> },
                    { id: 'transparent', label: 'Glass Overlay', icon: <Eye className="w-3 h-3" /> },
                  ] as const
                ).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleBgThemeChange(theme.id)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                      config.backgroundTheme === theme.id
                        ? 'bg-slate-700 text-cyan-300 font-bold border border-slate-600'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {theme.icon}
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Color Theme</label>
              <div className="grid grid-cols-5 gap-1.5">
                {(
                  [
                    { id: 'stellar', label: 'Blue', color: 'bg-blue-500' },
                    { id: 'neon', label: 'Neon', color: 'bg-fuchsia-500' },
                    { id: 'emerald', label: 'Jade', color: 'bg-emerald-500' },
                    { id: 'amber', label: 'Gold', color: 'bg-amber-500' },
                    { id: 'monochrome', label: 'Silver', color: 'bg-slate-300' },
                  ] as const
                ).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all ${
                      config.colorPreset === preset.id
                        ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400'
                        : 'border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${preset.color} shadow-sm`} />
                    <span className="text-[10px] text-slate-300 font-medium">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gravity Strength Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Gravity Pull</span>
                <span className="text-cyan-400 font-mono">{config.gravityStrength.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={config.gravityStrength}
                onChange={(e) => onChange({ ...config, gravityStrength: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Interaction Radius Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Interaction Radius</span>
                <span className="text-cyan-400 font-mono">{config.interactionRadius}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="380"
                step="10"
                value={config.interactionRadius}
                onChange={(e) => onChange({ ...config, interactionRadius: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Particle Count Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Particle Count</span>
                <span className="text-cyan-400 font-mono">{config.particleCount}</span>
              </div>
              <input
                type="range"
                min="40"
                max="220"
                step="10"
                value={config.particleCount}
                onChange={(e) => onChange({ ...config, particleCount: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Motion Speed Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Motion Speed</span>
                <span className="text-cyan-400 font-mono">{config.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                value={config.speed}
                onChange={(e) => onChange({ ...config, speed: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-slate-300 font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showCursorRing}
                  onChange={(e) => onChange({ ...config, showCursorRing: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <span>Gravity Ring</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.connectCursor}
                  onChange={(e) => onChange({ ...config, connectCursor: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <span>Cursor Web</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.connectParticles}
                  onChange={(e) => onChange({ ...config, connectParticles: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <span>Constellation</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.glowingEffect}
                  onChange={(e) => onChange({ ...config, glowingEffect: e.target.checked })}
                  className="rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <span>Glowing Bloom</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-cyan-400 font-semibold text-xs rounded-full border border-cyan-500/40 shadow-xl hover:border-cyan-400 transition-all group"
      >
        <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform animate-pulse" />
        <span>Gravity Particles</span>
        <span className="ml-1 text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full font-bold uppercase border border-cyan-800">
          {config.mode}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}
