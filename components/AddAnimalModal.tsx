import React, { useState, useEffect } from 'react';
import { Animal, AnimalFormData, AnimalType, AnimalRole, HealthStatus } from '../types';
import { ANIMAL_CLASS_SUGGESTIONS } from '../constants';

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animalData: AnimalFormData) => void;
  animal: Animal | null;
}

const AddAnimalModal: React.FC<AddAnimalModalProps> = ({ isOpen, onClose, onSave, animal }) => {
  const [formData, setFormData] = useState<AnimalFormData>({
    name: '',
    type: AnimalType.Sheep,
    class: '',
    role: AnimalRole.Meat,
    dailyOutput: 0,
    healthStatus: HealthStatus.Healthy,
    notes: '',
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    } else {
      setFormData({
        name: '',
        type: AnimalType.Sheep,
        class: '',
        role: AnimalRole.Meat,
        dailyOutput: 0,
        healthStatus: HealthStatus.Healthy,
        notes: '',
      });
    }
  }, [animal, isOpen]);

  useEffect(() => {
    const currentSuggestions = ANIMAL_CLASS_SUGGESTIONS[formData.type] || [];
    setSuggestions(currentSuggestions);
  }, [formData.type]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
     // If the type is changed, clear the class
    if (name === 'type') {
        setFormData(prev => ({ 
            ...prev, 
            type: value as AnimalType, 
            class: '' 
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: name === 'dailyOutput' ? parseFloat(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg m-4">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">{animal ? 'تعديل حيوان' : 'إضافة حيوان جديد'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم أو الرقم</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">النوع الأساسي</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {(Object.values(AnimalType) as string[]).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">التصنيف (اختياري)</label>
                <input type="text" name="class" id="class" value={formData.class || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" list="class-suggestions"/>
                <datalist id="class-suggestions">
                    {suggestions.map(s => <option key={s} value={s} />)}
                </datalist>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">الدور</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {(Object.values(AnimalRole) as string[]).map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700">الحالة الصحية</label>
              <select name="healthStatus" id="healthStatus" value={formData.healthStatus} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                {(Object.values(HealthStatus) as string[]).map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="dailyOutput" className="block text-sm font-medium text-gray-700">الإنتاج اليومي (إن وجد)</label>
            <input type="number" name="dailyOutput" id="dailyOutput" value={formData.dailyOutput} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
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