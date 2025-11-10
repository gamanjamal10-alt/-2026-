import React from 'react';
import { Vet } from '../types';
import { EditIcon, DeleteIcon, NoteIcon } from './Icons';

interface VetCardProps {
  vet: Vet;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between text-sm text-gray-700 py-1 border-b border-gray-200">
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
    </div>
);


const VetCard: React.FC<VetCardProps> = ({ vet, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="bg-brand-brown text-white p-4">
        <h3 className="text-xl font-bold">{vet.name}</h3>
        <p className="text-sm text-yellow-300">{vet.specialty}</p>
      </div>
      <div className="p-4 space-y-2 flex-grow">
        <InfoRow label="رقم الهاتف" value={vet.phone} />
        <div className="flex items-start gap-2 text-gray-700 pt-2">
            <NoteIcon />
            <p className="text-sm flex-1">{vet.notes || 'لا توجد ملاحظات.'}</p>
        </div>
      </div>
      <div className="p-3 bg-gray-50 border-t flex justify-end items-center gap-2">
        <button onClick={onEdit} className="p-2 rounded-full hover:bg-blue-100 transition-colors" aria-label="تعديل">
            <EditIcon />
        </button>
        <button onClick={onDelete} className="p-2 rounded-full hover:bg-red-100 transition-colors" aria-label="حذف">
            <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default VetCard;
