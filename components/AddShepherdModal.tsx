import React, { useState, useEffect } from 'react';
import { Shepherd, ShepherdFormData } from '../types';

interface AddShepherdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ShepherdFormData) => void;
  shepherd: Shepherd | null;
}

const AddShepherdModal: React.FC<AddShepherdModalProps> = ({ isOpen, onClose, onSave, shepherd }) => {
  const [formData, setFormData] = useState<ShepherdFormData>({
    name: '',
    phone: '',
    salary: 0,
    startDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (shepherd) {
      setFormData(shepherd);
    } else {
      setFormData({
        name: '',
        phone: '',
        salary: 0,
        startDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [shepherd, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'salary' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">{shepherd ? 'تعديل بيانات الراعي' : 'إضافة راعٍ جديد'}</h2>
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
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">الراتب الشهري (د.ج)</label>
            <input type="number" name="salary" id="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required min="0" />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">تاريخ بدء العمل</label>
            <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
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

export default AddShepherdModal;