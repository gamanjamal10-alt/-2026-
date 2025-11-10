
import React, { useState, useCallback } from 'react';
import { Animal, Crop } from '../types';
import { getFarmRecommendations } from '../services/geminiService';
import { LightbulbIcon } from './Icons';

interface RecommendationsProps {
  animals: Animal[];
  crops: Crop[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ animals, crops }) => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations('');
    try {
      const result = await getFarmRecommendations(animals, crops);
      // Basic markdown formatting for display
      const formattedResult = result
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-green-dark">$1</strong>')
        .replace(/\n/g, '<br />');
      setRecommendations(formattedResult);
    } catch (err) {
      setError('حدث خطأ أثناء جلب التوصيات.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [animals, crops]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-brand-green-dark mb-2">التوصيات الذكية</h2>
        <p className="text-gray-600">احصل على نصائح مخصصة لمزرعتك بناءً على البيانات الحالية.</p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={fetchRecommendations}
          disabled={isLoading}
          className="flex items-center gap-3 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-brown-dark font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-brown" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>جاري التحليل...</span>
            </>
          ) : (
            <>
              <LightbulbIcon />
              <span>احصل على توصيات الآن</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
      
      {recommendations && (
        <div className="prose max-w-none bg-brand-background p-4 rounded-md border-r-4 border-brand-green">
          <div dangerouslySetInnerHTML={{ __html: recommendations }} />
        </div>
      )}
    </div>
  );
};

export default Recommendations;
