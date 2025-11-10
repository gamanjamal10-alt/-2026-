import React, { useState, useEffect } from 'react';
import { Animal, AnimalFormData, AnimalType, AnimalRole, HealthStatus } from '../types';

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animalData: AnimalFormData) => void;
  animal: Animal | null;
}

const AddAnimalModal: React.FC<AddAnimalModalProps> = ({ isOpen, onClose, onSave, animal }) => {
  const [formData, setFormData] = useState<AnimalFormData>({
    name: '',
    type: AnimalType.Ewe,
    role: AnimalRole.Milk,
    dailyOutput: 0,
    healthStatus: HealthStatus.Healthy,
    notes: '',
  });

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    } else {
      setFormData({
        name: '',
        type: AnimalType.Ewe,
        role: AnimalRole.Milk,
        dailyOutput: 0,
        healthStatus: HealthStatus.Healthy,
        notes: '',
      });
    }
  }, [animal, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'dailyOutput' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">{animal ? 'تعديل حيوان' : 'إضافة حيوان جديد'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">النوع</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {/* FIX: Cast enum values to string array to satisfy React's key and value prop types */}
                {(Object.values(AnimalType) as string[]).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">الدور</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {/* FIX: Cast enum values to string array to satisfy React's key and value prop types */}
                {(Object.values(AnimalRole) as string[]).map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dailyOutput" className="block text-sm font-medium text-gray-700">الإنتاج اليومي</label>
              <input type="number" name="dailyOutput" id="dailyOutput" value={formData.dailyOutput} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700">الحالة الصحية</label>
              <select name="healthStatus" id="healthStatus" value={formData.healthStatus} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {/* FIX: Cast enum values to string array to satisfy React's key and value prop types */}
                {(Object.values(HealthStatus) as string[]).map(status => <option key={status} value={status}>{status}</option>)}
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

export default AddAnimalModal;