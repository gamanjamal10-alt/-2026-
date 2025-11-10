import React, { useState, useEffect } from 'react';
import { Vet, VetFormData } from '../types';

interface AddVetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VetFormData) => void;
  vet: Vet | null;
}

const AddVetModal: React.FC<AddVetModalProps> = ({ isOpen, onClose, onSave, vet }) => {
  const [formData, setFormData] = useState<VetFormData>({
    name: '',
    phone: '',
    specialty: '',
    notes: '',
  });

  useEffect(() => {
    if (vet) {
      setFormData(vet);
    } else {
      setFormData({
        name: '',
        phone: '',
        specialty: '',
        notes: '',
      });
    }
  }, [vet, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <h2 className="text-2xl font-bold text-brand-brown mb-4">{vet ? 'تعديل بيانات الطبيب' : 'إضافة طبيب بيطري'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">التخصص</label>
            <input type="text" name="specialty" id="specialty" value={formData.specialty} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
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

export default AddVetModal;
