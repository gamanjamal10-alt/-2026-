import React from 'react';
import { Shepherd } from '../types';
import { EditIcon, DeleteIcon } from './Icons';

interface ShepherdCardProps {
  shepherd: Shepherd;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between text-sm text-gray-700 py-1 border-b border-gray-200">
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
    </div>
);


const ShepherdCard: React.FC<ShepherdCardProps> = ({ shepherd, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="bg-brand-brown text-white p-4">
        <h3 className="text-xl font-bold">{shepherd.name}</h3>
      </div>
      <div className="p-4 space-y-2 flex-grow">
        <InfoRow label="رقم الهاتف" value={shepherd.phone} />
        <InfoRow label="الراتب الشهري" value={`${shepherd.salary} د.ج`} />
        <InfoRow label="تاريخ البدء" value={shepherd.startDate} />
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

export default ShepherdCard;