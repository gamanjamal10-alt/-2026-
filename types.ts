import React from 'react';

export enum AnimalType {
  Cow = 'بقرة',
  // --- Sheep (غنم) ---
  Ewe = 'نعجة',         // أنثى الخروف البالغة
  Ram = 'كبش',          // ذكر الخروف البالغ
  Alloush = 'علوش',     // خروف صغير (ذكر)
  Kharoufa = 'خروفة',    // خروفة صغيرة (أنثى)
  Jadaa = 'جدعة',       // عمره سنة
  Thniya = 'ثنية',       // عمرها سنتان (أنثى)
  Thni = 'ثني',         // عمره سنتان (ذكر)
  Rubaiyah = 'رباعية',    // عمرها أربع سنوات (أنثى)
  Rubaee = 'رباع',        // عمره أربع سنوات (ذكر)
  Sadsah = 'سدسة',      // عمره ست سنوات
  Wakrif = 'وكريف',      // كبش كبير في السن
  // --- Goats (ماعز) ---
  NannyGoat = 'عنزة',     // أنثى الماعز البالغة
  BillyGoat = 'عتروس',    // ذكر الماعز البالغ
  Jady = 'جدي',         // جدي صغير (ذكر)
  Jadyah = 'جدية',      // جدية صغيرة (أنثى)
  // --- Other ---
  Chicken = 'دجاجة',
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
  role: AnimalRole;
  dailyOutput: number;
  healthStatus: HealthStatus;
  notes: string;
}

export interface Animal extends AnimalFormData {
  id: number;
}


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

export type View = 'dashboard' | 'recommendations' | 'expenses' | 'shepherds' | 'farmWorkers';