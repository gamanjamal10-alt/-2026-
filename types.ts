import React from 'react';

// --- Vets ---
export interface Vet {
  id: number;
  name: string;
  phone: string;
  specialty: string;
  notes: string;
}
export type VetFormData = Omit<Vet, 'id'>;

// --- Crop Medicines ---
export enum MedicineType {
    Pesticide = 'مبيد حشري',
    Fungicide = 'مبيد فطري',
    Herbicide = 'مبيد أعشاب',
    Fertilizer = 'سماد سائل',
    Other = 'أخرى',
}

export interface CropMedicine {
  id: number;
  name: string;
  type: MedicineType;
  quantity: string; // e.g., "5 لتر", "10 كغ"
  notes: string;
}
export type CropMedicineFormData = Omit<CropMedicine, 'id'>;


// --- Animals ---
export enum AnimalType {
  Sheep = 'غنم',
  Goat = 'ماعز',
  Cow = 'بقرة',
  Chicken = 'دجاج',
  Camel = 'جمل',
}

export enum AnimalRole {
  Milk = 'حليب',
  Meat = 'لحم',
  Wool = 'صوف',
  Eggs = 'بيض',
  Work = 'عمل',
}

export enum HealthStatus {
  Healthy = 'صحة جيدة',
  Recovering = 'يتعافى',
  Sick = 'مريض',
  Critical = 'حالة حرجة',
}

export interface AnimalFormData {
  name: string;
  type: AnimalType;
  class?: string; // New optional field for local classification
  role: AnimalRole;
  dailyOutput: number;
  healthStatus: HealthStatus;
  notes: string;
}

export interface Animal extends AnimalFormData {
  id: number;
}


// --- Crops ---
export enum CropType {
  // Grains / المحاصيل والحبوب
  Wheat = 'قمح',
  Barley = 'شعير',
  Oats = 'شوفان (خرطال)',
  Corn = 'ذرة',
  
  // Vegetables / الخضروات
  Tomato = 'طماطم',
  Cucumber = 'خيار',
  Potato = 'بطاطس',
  Onion = 'بصل',
  Garlic = 'ثوم',
  Carrot = 'جزر',
  BellPepper = 'فلفل حلو',
  Eggplant = 'باذنجان',
  Zucchini = 'كوسة',
  
  // Fruits / الفواكه
  Dates = 'تمر',
  Olives = 'زيتون',
  Grapes = 'عنب',
  Oranges = 'برتقال',
  Figs = 'تين',
  Pomegranate = 'رمان',
  
  // Legumes / البقوليات
  Lentils = 'عدس',
  Chickpeas = 'حمص',
}

export enum CropStage {
  Seeding = 'بذر',
  Growing = 'نمو',
  Harvesting = 'حصاد',
  Harvested = 'تم الحصاد',
}

export interface CropFormData {
  name: string;
  type: CropType;
  stage: CropStage;
  notes: string;
}

export interface Crop extends CropFormData {
  id: number;
}

// --- Expenses ---
export enum ExpenseCategory {
  Feed = 'علف',
  Medicine = 'أدوية',
  Seeds = 'بذور',
  Fertilizer = 'سماد',
  Labor = 'أجور عمال',
  Maintenance = 'صيانة',
  Other = 'أخرى',
}

export interface ExpenseFormData {
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
}

export interface Expense extends ExpenseFormData {
  id: number;
}

// --- Staff ---
export interface Shepherd {
    id: number;
    name: string;
    phone: string;
    salary: number;
    startDate: string;
}
export type ShepherdFormData = Omit<Shepherd, 'id'>;

export interface FarmWorker {
    id: number;
    name: string;
    phone: string;
    salary: number;
    startDate: string;
}
export type FarmWorkerFormData = Omit<FarmWorker, 'id'>;

// --- App Navigation ---
export type View = 'dashboard' | 'recommendations' | 'expenses' | 'shepherds' | 'farmWorkers' | 'vets' | 'cropMedicines';