
import React, { useState, useEffect } from 'react';
import { Crop, CropFormData, CropType, CropStage } from '../types';

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cropData: CropFormData) => void;
  crop: Crop | null;
}

const AddCropModal: React.FC<AddCropModalProps> = ({ isOpen, onClose, onSave, crop }) => {
  const [formData, setFormData] = useState<CropFormData>({
    name: '',
    type: CropType.Tomato,
    stage: CropStage.Seeding,
    notes: '',
  });

  useEffect(() => {
    if (crop) {
      setFormData(crop);
    } else {
      setFormData({
        name: '',
        type: CropType.Tomato,
        stage: CropStage.Seeding,
        notes: '',
      });
    }
  }, [crop, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-brand-green-dark mb-4">{crop ? 'تعديل محصول' : 'إضافة محصول جديد'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم الحقل/المحصول</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">النوع</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {/* FIX: Cast enum values to string array to satisfy React's key and value prop types */}
                {(Object.values(CropType) as string[]).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700">مرحلة النمو</label>
              <select name="stage" id="stage" value={formData.stage} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {/* FIX: Cast enum values to string array to satisfy React's key and value prop types */}
                {(Object.values(CropStage) as string[]).map(stage => <option key={stage} value={stage}>{stage}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">ملاحظات</label>
            <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">إلغاء</button>
            <button type="submit" className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-green-dark">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;
