import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { 
  Animal, AnimalFormData, 
  Crop, CropFormData, 
  Expense, ExpenseFormData, 
  Shepherd, ShepherdFormData, 
  FarmWorker, FarmWorkerFormData,
  Vet, VetFormData,
  CropMedicine, CropMedicineFormData,
  View 
} from './types';
import { INITIAL_SHEPHERDS, INITIAL_FARM_WORKERS, INITIAL_VETS, INITIAL_CROP_MEDICINES } from './constants';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Recommendations from './components/Recommendations';
import Financials from './components/Financials';
import Shepherds from './components/Shepherds';
import FarmWorkers from './components/FarmWorkers';
import Vets from './components/Vets';
import CropMedicines from './components/CropMedicines';
import AddAnimalModal from './components/AddAnimalModal';
import AddCropModal from './components/AddCropModal';
import AddExpenseModal from './components/AddExpenseModal';
import AddShepherdModal from './components/AddShepherdModal';
import AddFarmWorkerModal from './components/AddFarmWorkerModal';
import AddVetModal from './components/AddVetModal';
import AddCropMedicineModal from './components/AddCropMedicineModal';


function App() {
  const [view, setView] = useState<View>('dashboard');

  // Main state management using local storage
  const [animals, setAnimals] = useLocalStorage<Animal[]>('animals', []);
  const [crops, setCrops] = useLocalStorage<Crop[]>('crops', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [shepherds, setShepherds] = useLocalStorage<Shepherd[]>('shepherds', INITIAL_SHEPHERDS);
  const [farmWorkers, setFarmWorkers] = useLocalStorage<FarmWorker[]>('farmWorkers', INITIAL_FARM_WORKERS);
  const [vets, setVets] = useLocalStorage<Vet[]>('vets', INITIAL_VETS);
  const [cropMedicines, setCropMedicines] = useLocalStorage<CropMedicine[]>('cropMedicines', INITIAL_CROP_MEDICINES);


  // Modal visibility state
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isShepherdModalOpen, setIsShepherdModalOpen] = useState(false);
  const [isFarmWorkerModalOpen, setIsFarmWorkerModalOpen] = useState(false);
  const [isVetModalOpen, setIsVetModalOpen] = useState(false);
  const [isCropMedicineModalOpen, setIsCropMedicineModalOpen] = useState(false);

  // State for editing items
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingShepherd, setEditingShepherd] = useState<Shepherd | null>(null);
  const [editingFarmWorker, setEditingFarmWorker] = useState<FarmWorker | null>(null);
  const [editingVet, setEditingVet] = useState<Vet | null>(null);
  const [editingCropMedicine, setEditingCropMedicine] = useState<CropMedicine | null>(null);

  // Handlers for Animals
  const handleAddAnimal = () => { setEditingAnimal(null); setIsAnimalModalOpen(true); };
  const handleEditAnimal = (animal: Animal) => { setEditingAnimal(animal); setIsAnimalModalOpen(true); };
  const handleDeleteAnimal = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setAnimals(prev => prev.filter(a => a.id !== id)); };
  const handleSaveAnimal = (data: AnimalFormData) => {
    setAnimals(prev => editingAnimal ? prev.map(a => a.id === editingAnimal.id ? { ...data, id: a.id } : a) : [...prev, { ...data, id: Date.now() }]);
    setIsAnimalModalOpen(false);
  };
  
  // Handlers for Crops
  const handleAddCrop = () => { setEditingCrop(null); setIsCropModalOpen(true); };
  const handleEditCrop = (crop: Crop) => { setEditingCrop(crop); setIsCropModalOpen(true); };
  const handleDeleteCrop = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setCrops(prev => prev.filter(c => c.id !== id)); };
  const handleSaveCrop = (data: CropFormData) => {
    setCrops(prev => editingCrop ? prev.map(c => c.id === editingCrop.id ? { ...data, id: c.id } : c) : [...prev, { ...data, id: Date.now() }]);
    setIsCropModalOpen(false);
  };

  // Handlers for Expenses
  const handleAddExpense = () => { setEditingExpense(null); setIsExpenseModalOpen(true); };
  const handleEditExpense = (expense: Expense) => { setEditingExpense(expense); setIsExpenseModalOpen(true); };
  const handleDeleteExpense = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setExpenses(prev => prev.filter(e => e.id !== id)); };
  const handleSaveExpense = (data: ExpenseFormData) => {
    setExpenses(prev => editingExpense ? prev.map(e => e.id === editingExpense.id ? { ...data, id: e.id } : e) : [...prev, { ...data, id: Date.now() }]);
    setIsExpenseModalOpen(false);
  };

  // Handlers for Shepherds
  const handleAddShepherd = () => { setEditingShepherd(null); setIsShepherdModalOpen(true); };
  const handleEditShepherd = (shepherd: Shepherd) => { setEditingShepherd(shepherd); setIsShepherdModalOpen(true); };
  const handleDeleteShepherd = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setShepherds(prev => prev.filter(s => s.id !== id)); };
  const handleSaveShepherd = (data: ShepherdFormData) => {
    setShepherds(prev => editingShepherd ? prev.map(s => s.id === editingShepherd.id ? { ...data, id: s.id } : s) : [...prev, { ...data, id: Date.now() }]);
    setIsShepherdModalOpen(false);
  };

  // Handlers for Farm Workers
  const handleAddFarmWorker = () => { setEditingFarmWorker(null); setIsFarmWorkerModalOpen(true); };
  const handleEditFarmWorker = (worker: FarmWorker) => { setEditingFarmWorker(worker); setIsFarmWorkerModalOpen(true); };
  const handleDeleteFarmWorker = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setFarmWorkers(prev => prev.filter(w => w.id !== id)); };
  const handleSaveFarmWorker = (data: FarmWorkerFormData) => {
    setFarmWorkers(prev => editingFarmWorker ? prev.map(w => w.id === editingFarmWorker.id ? { ...data, id: w.id } : w) : [...prev, { ...data, id: Date.now() }]);
    setIsFarmWorkerModalOpen(false);
  };

  // Handlers for Vets
  const handleAddVet = () => { setEditingVet(null); setIsVetModalOpen(true); };
  const handleEditVet = (vet: Vet) => { setEditingVet(vet); setIsVetModalOpen(true); };
  const handleDeleteVet = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setVets(prev => prev.filter(v => v.id !== id)); };
  const handleSaveVet = (data: VetFormData) => {
    setVets(prev => editingVet ? prev.map(v => v.id === editingVet.id ? { ...data, id: v.id } : v) : [...prev, { ...data, id: Date.now() }]);
    setIsVetModalOpen(false);
  };

  // Handlers for Crop Medicines
  const handleAddCropMedicine = () => { setEditingCropMedicine(null); setIsCropMedicineModalOpen(true); };
  const handleEditCropMedicine = (medicine: CropMedicine) => { setEditingCropMedicine(medicine); setIsCropMedicineModalOpen(true); };
  const handleDeleteCropMedicine = (id: number) => { if (window.confirm('هل أنت متأكد؟')) setCropMedicines(prev => prev.filter(m => m.id !== id)); };
  const handleSaveCropMedicine = (data: CropMedicineFormData) => {
    setCropMedicines(prev => editingCropMedicine ? prev.map(m => m.id === editingCropMedicine.id ? { ...data, id: m.id } : m) : [...prev, { ...data, id: Date.now() }]);
    setIsCropMedicineModalOpen(false);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard animals={animals} crops={crops} onAddAnimal={handleAddAnimal} onEditAnimal={handleEditAnimal} onDeleteAnimal={handleDeleteAnimal} onAddCrop={handleAddCrop} onEditCrop={handleEditCrop} onDeleteCrop={handleDeleteCrop} />;
      case 'recommendations':
        return <Recommendations animals={animals} crops={crops} />;
      case 'expenses':
        return <Financials expenses={expenses} shepherds={shepherds} farmWorkers={farmWorkers} onAddExpense={handleAddExpense} onEditExpense={handleEditExpense} onDeleteExpense={handleDeleteExpense} />;
      case 'shepherds':
        return <Shepherds shepherds={shepherds} onAdd={handleAddShepherd} onEdit={handleEditShepherd} onDelete={handleDeleteShepherd} />;
      case 'farmWorkers':
        return <FarmWorkers farmWorkers={farmWorkers} onAdd={handleAddFarmWorker} onEdit={handleEditFarmWorker} onDelete={handleDeleteFarmWorker} />;
      case 'vets':
        return <Vets vets={vets} onAdd={handleAddVet} onEdit={handleEditVet} onDelete={handleDeleteVet} />;
      case 'cropMedicines':
        return <CropMedicines cropMedicines={cropMedicines} onAdd={handleAddCropMedicine} onEdit={handleEditCropMedicine} onDelete={handleDeleteCropMedicine} />;
      default:
        return <Dashboard animals={animals} crops={crops} onAddAnimal={handleAddAnimal} onEditAnimal={handleEditAnimal} onDeleteAnimal={handleDeleteAnimal} onAddCrop={handleAddCrop} onEditCrop={handleEditCrop} onDeleteCrop={handleDeleteCrop} />;
    }
  };

  return (
    <div className="bg-brand-background min-h-screen font-sans" dir="rtl">
      <Header currentView={view} onNavigate={setView} />
      <main className="container mx-auto p-4 md:p-8">
        {renderView()}
      </main>

      <AddAnimalModal isOpen={isAnimalModalOpen} onClose={() => setIsAnimalModalOpen(false)} onSave={handleSaveAnimal} animal={editingAnimal} />
      <AddCropModal isOpen={isCropModalOpen} onClose={() => setIsCropModalOpen(false)} onSave={handleSaveCrop} crop={editingCrop} />
      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} onSave={handleSaveExpense} expense={editingExpense} />
      <AddShepherdModal isOpen={isShepherdModalOpen} onClose={() => setIsShepherdModalOpen(false)} onSave={handleSaveShepherd} shepherd={editingShepherd} />
      <AddFarmWorkerModal isOpen={isFarmWorkerModalOpen} onClose={() => setIsFarmWorkerModalOpen(false)} onSave={handleSaveFarmWorker} worker={editingFarmWorker} />
      <AddVetModal isOpen={isVetModalOpen} onClose={() => setIsVetModalOpen(false)} onSave={handleSaveVet} vet={editingVet} />
      <AddCropMedicineModal isOpen={isCropMedicineModalOpen} onClose={() => setIsCropMedicineModalOpen(false)} onSave={handleSaveCropMedicine} medicine={editingCropMedicine} />
    </div>
  );
}

export default App;