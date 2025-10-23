
import React, { useState } from 'react';
import type { ScriptData } from '../types';

interface ScriptInputFormProps {
  onSubmit: (data: ScriptData) => void;
  isLoading: boolean;
  sampleData: ScriptData;
}

export const ScriptInputForm: React.FC<ScriptInputFormProps> = ({ onSubmit, isLoading, sampleData }) => {
  const [formData, setFormData] = useState<ScriptData>({
    companyName: '',
    productDescription: '',
    sellingPoints: '',
    targetAudience: '',
    callToAction: '',
    tagline: '',
    duration: '30'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const loadSampleData = () => {
    setFormData(sampleData);
  };

  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200";
  const labelClass = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Your Ad Script</h2>
          <button
              onClick={loadSampleData}
              className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-1 px-3 rounded-md transition-colors"
              type="button"
          >
              Load Sample
          </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className={labelClass}>Company / Product Name</label>
          <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} placeholder="e.g., FUZETECH MOBILE" required />
        </div>

        <div>
          <label htmlFor="productDescription" className={labelClass}>Product / Service Description</label>
          <textarea name="productDescription" id="productDescription" value={formData.productDescription} onChange={handleChange} className={inputClass} placeholder="e.g., Genuine phone spares, accessories, expert repairs" rows={3} required />
        </div>
        
        <div>
          <label htmlFor="sellingPoints" className={labelClass}>Key Selling Points (comma-separated)</label>
          <input type="text" name="sellingPoints" id="sellingPoints" value={formData.sellingPoints} onChange={handleChange} className={inputClass} placeholder="e.g., Trust, speed, quality service, fast delivery" required />
        </div>
        
        <div>
          <label htmlFor="targetAudience" className={labelClass}>Target Audience & Tone</label>
          <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={handleChange} className={inputClass} placeholder="e.g., Tech-savvy youth, energetic and modern tone" required />
        </div>
        
        <div>
          <label htmlFor="callToAction" className={labelClass}>Call to Action</label>
          <input type="text" name="callToAction" id="callToAction" value={formData.callToAction} onChange={handleChange} className={inputClass} placeholder="e.g., Call us on 0712 XXX XXX" required />
        </div>

        <div>
          <label htmlFor="tagline" className={labelClass}>Tagline</label>
          <input type="text" name="tagline" id="tagline" value={formData.tagline} onChange={handleChange} className={inputClass} placeholder="e.g., Innovating Your World." required />
        </div>

        <div>
          <label htmlFor="duration" className={labelClass}>Ad Duration</label>
          <select name="duration" id="duration" value={formData.duration} onChange={handleChange} className={inputClass}>
            <option value="15">15 seconds (Social Media)</option>
            <option value="30">30 seconds (Standard Radio)</option>
            <option value="45">45 seconds</option>
            <option value="60">60 seconds (Full Feature)</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Script'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
