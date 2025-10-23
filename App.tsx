
import React, { useState } from 'react';
import { ScriptInputForm } from './components/ScriptInputForm';
import { ScriptOutput } from './components/ScriptOutput';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { generateScript } from './services/geminiService';
import type { ScriptData, GeneratedScript } from './types';

const App: React.FC = () => {
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = async (data: ScriptData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedScript(null);

    try {
      const script = await generateScript(data);
      setGeneratedScript(script);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sampleScriptData: ScriptData = {
    companyName: 'FUZETECH MOBILE',
    productDescription: 'Genuine phone spares, accessories, laptops, and expert repairs.',
    sellingPoints: 'Trust, speed, quality service, fast delivery anywhere.',
    targetAudience: 'Tech-savvy individuals in Kenya, energetic and modern tone.',
    callToAction: 'Call or WhatsApp us on 0712 516 112 or visit us in Kakamega Town.',
    tagline: 'Innovating Laptops, Phones, and Phone Spares. Fuzetech hapa ndipo!',
    duration: '45'
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScriptInputForm onSubmit={handleGenerateScript} isLoading={isLoading} sampleData={sampleScriptData} />
          <div className="lg:sticky lg:top-8">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {generatedScript && !isLoading && <ScriptOutput script={generatedScript} />}
            {!isLoading && !error && !generatedScript && (
               <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 text-slate-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Your generated script will appear here</h3>
                <p className="text-slate-400 mt-2">Fill out the form on the left and click "Generate Script" to see the magic happen. You can also start with our sample data!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
