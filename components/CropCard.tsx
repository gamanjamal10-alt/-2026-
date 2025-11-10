
import React from 'react';
import { Crop, CropStage } from '../types';
import { EditIcon, DeleteIcon, StageIcon, NoteIcon } from './Icons';

interface CropCardProps {
  crop: Crop;
  onEdit: () => void;
  onDelete: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onEdit, onDelete }) => {

  const getStageColor = (stage: CropStage) => {
    switch (stage) {
      case CropStage.Seeding: return 'bg-yellow-500';
      case CropStage.Growing: return 'bg-green-500';
      case CropStage.Harvesting: return 'bg-orange-500';
      case CropStage.Harvested: return 'bg-brand-brown';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="bg-brand-green text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{crop.name}</h3>
          <span className="text-sm bg-brand-green-dark px-2 py-1 rounded-full">{crop.type}</span>
        </div>
      </div>
      <div className="p-4 space-y-3 flex-grow">
        <div className="flex items-center gap-2 text-gray-700">
          <StageIcon />
          <span>مرحلة النمو:</span>
          <span className={`px-2 py-1 text-xs text-white rounded-full ${getStageColor(crop.stage)}`}>
            {crop.stage}
          </span>
        </div>
        <div className="flex items-start gap-2 text-gray-700">
            <NoteIcon />
            <p className="text-sm flex-1">{crop.notes || 'لا توجد ملاحظات.'}</p>
        </div>
      </div>
      <div className="p-3 bg-gray-50 border-t flex justify-end items-center">
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

export default CropCard;
