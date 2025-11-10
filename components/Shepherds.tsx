import React from 'react';
import { Shepherd } from '../types';
import ShepherdCard from './ShepherdCard';
import { PlusIcon, ShepherdIcon } from './Icons';

interface ShepherdsProps {
  shepherds: Shepherd[];
  onAdd: () => void;
  onEdit: (shepherd: Shepherd) => void;
  onDelete: (id: number) => void;
}

const Shepherds: React.FC<ShepherdsProps> = ({ shepherds, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-green-dark flex items-center gap-3"><ShepherdIcon /> إدارة الرعاة</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          <span>إضافة راعٍ</span>
        </button>
      </div>
      {shepherds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shepherds.map(shepherd => (
            <ShepherdCard
              key={shepherd.id}
              shepherd={shepherd}
              onEdit={() => onEdit(shepherd)}
              onDelete={() => onDelete(shepherd.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">لا يوجد رعاة مسجلون حالياً. قم بإضافة راعٍ جديد.</p>
      )}
    </div>
  );
};

export default Shepherds;