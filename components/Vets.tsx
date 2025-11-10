import React from 'react';
import { Vet } from '../types';
import VetCard from './VetCard';
import { PlusIcon, VetIcon } from './Icons';

interface VetsProps {
  vets: Vet[];
  onAdd: () => void;
  onEdit: (vet: Vet) => void;
  onDelete: (id: number) => void;
}

const Vets: React.FC<VetsProps> = ({ vets, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-green-dark flex items-center gap-3"><VetIcon /> إدارة الأطباء البيطريون</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          <span>إضافة طبيب</span>
        </button>
      </div>
      {vets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vets.map(vet => (
            <VetCard
              key={vet.id}
              vet={vet}
              onEdit={() => onEdit(vet)}
              onDelete={() => onDelete(vet.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">لا يوجد أطباء بيطريون مسجلون حالياً.</p>
      )}
    </div>
  );
};

export default Vets;
