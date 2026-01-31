import React, { useState } from 'react';
import SpotlightOverlay from './components/SpotlightOverlay';
import VideoScrubber from './components/VideoScrubber';
import Header from './components/Header';
import { VideoSample } from './types';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const sampleVideos: VideoSample[] = [
  {
    id: 'v1',
    title: 'SEQ_001_NEON_DRIFT',
    engine: 'Diffusion v4.2',
    duration: '00:12:04'
  },
  {
    id: 'v2',
    title: 'SEQ_002_CYBER_NOIR',
    engine: 'NeRF Render Alpha',
    duration: '00:08:15'
  },
  {
    id: 'v3',
    title: 'SEQ_003_FLUID_DYNAMICS',
    engine: 'Particle Gen 2',
    duration: '00:15:00'
  },
  {
    id: 'v4',
    title: 'SEQ_004_ATMOSPHERE',
    engine: 'Volumetric Cloud',
    duration: '00:06:45'
  }
];

const App: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Access requested for: ${email}`);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30">
      <SpotlightOverlay />
      <Header />

      {/* Main Content - Z-index 10 to sit below spotlight (z-50) but we need interaction. 
          The SpotlightOverlay is pointer-events-none, so clicks pass through to here. */}
      <main className="relative z-10 flex flex-col items-center w-full">
        
        {/* Hero Section */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-blue-300 mb-8 backdrop-blur-sm">
            <Sparkles size={12} />
            <span>v4.0 Model Release Candidate</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter mb-8 leading-[0.9]">
            <span className="holo-text block">DREAM</span>
            <span className="block text-white">ENGINE</span>
          </h1>

          <p className="max-w-xl text-white/50 text-lg md:text-xl font-light mb-12 leading-relaxed">
            Generative video models for high-fidelity cinema. <br className="hidden md:block" />
            Move your cursor to illuminate the latent space.
          </p>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
             <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-widest uppercase text-xs hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                Start Generating
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <button className="px-8 py-4 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 font-bold tracking-widest uppercase text-xs text-white">
                View Documentation
             </button>
          </div>

          <div className="absolute bottom-10 animate-bounce text-white/20">
            <ChevronDown size={24} />
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full max-w-7xl px-4 py-24 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
             <div>
                <h2 className="text-3xl font-display font-bold mb-2">Latent Explorations</h2>
                <p className="text-white/40 text-sm">Recent community generations rendered in real-time.</p>
             </div>
             <div className="hidden md:block text-xs font-mono text-white/30">
                DISPLAYING 4 / 2,849
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleVideos.map((video) => (
              <VideoScrubber key={video.id} data={video} />
            ))}
          </div>
        </section>

        {/* Early Access Form */}
        <section className="w-full max-w-2xl px-4 py-32 text-center">
            <div className="bg-glass border border-glassBorder p-12 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                {/* Decorative gradients inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
                
                <h2 className="text-4xl font-display font-bold mb-4 relative z-10">Request Access</h2>
                <p className="text-white/50 mb-8 relative z-10">
                    Join the waitlist to access the Dream Engine API and Studio tools.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <input 
                        type="email" 
                        placeholder="researcher@institute.edu" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                    <button type="submit" className="bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-blue-50 transition-colors">
                        Join Waitlist
                    </button>
                </form>
            </div>
        </section>

        <footer className="w-full border-t border-white/5 py-12 text-center text-white/20 text-xs font-mono">
            <p>© 2024 VISIONARY AI LABS. ALL RIGHTS RESERVED.</p>
        </footer>

      </main>
    </div>
  );
};

export default App;