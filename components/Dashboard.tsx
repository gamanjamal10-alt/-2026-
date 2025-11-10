
import React, { useMemo } from 'react';
import { Animal, Crop, AnimalType } from '../types';
import AnimalCard from './AnimalCard';
import CropCard from './CropCard';
import { PlusIcon } from './Icons';
import Alerts from './Alerts';

interface DashboardProps {
  animals: Animal[];
  crops: Crop[];
  onAddAnimal: () => void;
  onEditAnimal: (animal: Animal) => void;
  onDeleteAnimal: (id: number) => void;
  onAddCrop: () => void;
  onEditCrop: (crop: Crop) => void;
  onDeleteCrop: (id: number) => void;
}

const StatCard: React.FC<{ title: string; value: number | string, color: string }> = ({ title, value, color }) => (
    <div className={`p-4 rounded-lg shadow-md text-white ${color}`}>
        <h4 className="text-sm font-semibold uppercase">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({
  animals,
  crops,
  onAddAnimal,
  onEditAnimal,
  onDeleteAnimal,
  onAddCrop,
  onEditCrop,
  onDeleteCrop,
}) => {
  const { groupedAnimals, animalCounts } = useMemo(() => {
    const groups = animals.reduce((acc: Record<AnimalType, Animal[]>, animal) => {
      const type = animal.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(animal);
      return acc;
    }, {} as Record<AnimalType, Animal[]>);

    // FIX: Add type assertion to Object.entries to correctly type the `group` variable, as TypeScript was incorrectly inferring it as `unknown`.
    const counts = (Object.entries(groups) as [string, Animal[]][]).reduce((acc: Record<string, number>, [type, group]) => {
        acc[type] = group.length;
        return acc;
    }, {});

    return { groupedAnimals: groups, animalCounts: counts };
  }, [animals]);

  return (
    <div className="space-y-8">
        {/* Farm Summary Section */}
        <div>
            <h2 className="text-2xl font-bold text-brand-green-dark mb-4">ملخص المزرعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                <StatCard title="إجمالي المحاصيل" value={crops.length} color="bg-brand-green" />
                {Object.entries(animalCounts).map(([type, count]) => (
                    <StatCard key={type} title={`إجمالي ${type}`} value={count as number} color="bg-brand-brown" />
                ))}
            </div>
        </div>
      
      <Alerts animals={animals} crops={crops} />

      {/* Animals Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-brand-green-dark">الحيوانات</h2>
          <button
            onClick={onAddAnimal}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            <span>إضافة حيوان</span>
          </button>
        </div>
        {animals.length > 0 ? (
          <div className="space-y-6">
            {(Object.entries(groupedAnimals) as [string, Animal[]][]).map(([type, animalGroup]) => (
              <div key={type}>
                <h3 className="text-2xl font-semibold text-brand-brown mb-3 border-b-2 border-brand-green pb-1">{type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {animalGroup.map(animal => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      onEdit={() => onEditAnimal(animal)}
                      onDelete={() => onDeleteAnimal(animal.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">لا يوجد حيوانات بعد. قم بإضافة حيوان جديد لتبدأ.</p>
        )}
      </div>

      {/* Crops Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-brand-green-dark">المحاصيل</h2>
          <button
            onClick={onAddCrop}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            <span>إضافة محصول</span>
          </button>
        </div>
        {crops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crops.map(crop => (
            <CropCard
              key={crop.id}
              crop={crop}
              onEdit={() => onEditCrop(crop)}
              onDelete={() => onDeleteCrop(crop.id)}
            />
          ))}
        </div>
        ) : (
            <p className="text-center text-gray-500 py-8">لا يوجد محاصيل بعد. قم بإضافة محصول جديد.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
