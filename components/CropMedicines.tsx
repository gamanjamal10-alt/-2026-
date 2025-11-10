import React from 'react';
import { CropMedicine } from '../types';
import CropMedicineCard from './CropMedicineCard';
import { PlusIcon, MedicineIcon } from './Icons';

interface CropMedicinesProps {
  cropMedicines: CropMedicine[];
  onAdd: () => void;
  onEdit: (medicine: CropMedicine) => void;
  onDelete: (id: number) => void;
}

const CropMedicines: React.FC<CropMedicinesProps> = ({ cropMedicines, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-green-dark flex items-center gap-3"><MedicineIcon /> إدارة أدوية المحاصيل</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          <span>إضافة دواء</span>
        </button>
      </div>
      {cropMedicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cropMedicines.map(medicine => (
            <CropMedicineCard
              key={medicine.id}
              medicine={medicine}
              onEdit={() => onEdit(medicine)}
              onDelete={() => onDelete(medicine.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">لا يوجد أدوية أو مستلزمات مسجلة حالياً.</p>
      )}
    </div>
  );
};

export default CropMedicines;
