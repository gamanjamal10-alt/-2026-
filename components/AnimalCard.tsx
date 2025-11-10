import React from 'react';
import { Animal, HealthStatus } from '../types';
import { ANIMAL_SOUNDS } from '../constants';
import { SoundIcon, EditIcon, DeleteIcon, HeartIcon, OutputIcon, NoteIcon } from './Icons';

interface AnimalCardProps {
  animal: Animal;
  onEdit: () => void;
  onDelete: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onEdit, onDelete }) => {
  const handlePlaySound = () => {
    const soundSrc = ANIMAL_SOUNDS[animal.type];
    if (soundSrc) {
      const audio = new Audio(soundSrc);
      audio.volume = 0.75;
      audio.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const getHealthColor = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.Healthy: return 'bg-green-500';
      case HealthStatus.Recovering: return 'bg-blue-500';
      case HealthStatus.Sick: return 'bg-yellow-500';
      case HealthStatus.Critical: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="bg-brand-brown text-white p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{animal.name}</h3>
          <div className="text-right">
            <span className="text-sm bg-brand-brown-light px-2 py-1 rounded-full whitespace-nowrap">
              {animal.class ? `${animal.class} (${animal.type})` : animal.type}
            </span>
            <span className="block text-xs mt-1 text-yellow-300">{animal.role}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 flex-grow">
        <div className="flex items-center gap-2 text-gray-700">
            <HeartIcon />
            <span>الحالة الصحية:</span>
            <span className={`px-2 py-1 text-xs text-white rounded-full ${getHealthColor(animal.healthStatus)}`}>
            {animal.healthStatus}
            </span>
        </div>
        {animal.dailyOutput > 0 && (
             <div className="flex items-center gap-2 text-gray-700">
                <OutputIcon />
                <span>الإنتاج اليومي: {animal.dailyOutput}</span>
            </div>
        )}
        <div className="flex items-start gap-2 text-gray-700">
            <NoteIcon />
            <p className="text-sm flex-1">{animal.notes || 'لا توجد ملاحظات.'}</p>
        </div>
      </div>
      <div className="p-3 bg-gray-50 border-t flex justify-between items-center">
        <button onClick={handlePlaySound} className="p-2 rounded-full hover:bg-brand-yellow-dark transition-colors" aria-label="تشغيل الصوت">
            <SoundIcon />
        </button>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 rounded-full hover:bg-blue-100 transition-colors" aria-label="تعديل">
            <EditIcon />
          </button>
          <button onClick={onDelete} className="p-2 rounded-full hover:bg-red-100 transition-colors" aria-label="حذف">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;