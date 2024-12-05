import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Earpods Page</title>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          .hero-bg {
            background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
            background-size: 200% 200%;
            animation: gradientBG 15s ease infinite;
          }
          
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .card-shine {
            position: relative;
            overflow: hidden;
          }
          
          .card-shine::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              transparent 100%
            );
            transform: rotate(45deg);
            animation: shine 3s infinite;
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }

          .fancy-button {
            background: linear-gradient(45deg, #FF3366, #FF6B6B);
            border: none;
            padding: 16px 40px;
            color: white;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            letter-spacing: 0.5px;
            box-shadow: 0 10px 20px rgba(255, 51, 102, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .fancy-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 25px rgba(255, 51, 102, 0.4);
          }

          .fancy-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.2), transparent);
            transition: all 0.3s ease;
          }

          .fancy-button:hover::after {
            transform: translateX(100%);
          }

          .button-text {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          .fancy-button:active {
            transform: translateY(2px);
            box-shadow: 0 5px 10px rgba(255, 51, 102, 0.4);
          }
        `}</style>
      </Head>
      <div className="hero-bg flex flex-col items-center justify-center min-h-screen p-8">
        <div className="relative w-full max-w-2xl">
          <div 
            className="card-shine bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center border border-white/20"
            style={{ animation: 'fadeIn 1s ease-out' }}
          >
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight"
                style={{ animation: 'float 3s ease-in-out infinite' }}>
              Welcome to Our World
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Experience the future of audio with our revolutionary earpods.
              <br />
              Where innovation meets incredible sound.
            </p>
            <Link href='/landingpageform'>
            <button className="relative group">
      {/* Background layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      {/* Main button */}
      <div className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
        <span className="text-white font-medium transition duration-200">
          Discover More
        </span>
        <ArrowRight className="w-5 h-5 ml-2 text-pink-400 group-hover:text-pink-300 transform transition duration-200 group-hover:translate-x-1" />
        
        {/* Particle effects */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ filter: 'blur(1px)' }} />
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" style={{ filter: 'blur(0.5px)' }} />
        </div>
      </div>
    </button>
            </Link>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Background decorative circles */}
        <div className="fixed top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
    </>
  );
}

export default LandingPage;