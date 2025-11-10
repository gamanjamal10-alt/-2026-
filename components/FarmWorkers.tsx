import React from 'react';
import { FarmWorker } from '../types';
import FarmWorkerCard from './FarmWorkerCard';
import { PlusIcon, WorkerIcon } from './Icons';

interface FarmWorkersProps {
  farmWorkers: FarmWorker[];
  onAdd: () => void;
  onEdit: (worker: FarmWorker) => void;
  onDelete: (id: number) => void;
}

const FarmWorkers: React.FC<FarmWorkersProps> = ({ farmWorkers, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-green-dark flex items-center gap-3"><WorkerIcon /> إدارة العمال</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          <span>إضافة عامل</span>
        </button>
      </div>
      {farmWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmWorkers.map(worker => (
            <FarmWorkerCard
              key={worker.id}
              farmWorker={worker}
              onEdit={() => onEdit(worker)}
              onDelete={() => onDelete(worker.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">لا يوجد عمال مسجلون حالياً. قم بإضافة عامل جديد.</p>
      )}
    </div>
  );
};

export default FarmWorkers;