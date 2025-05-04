
import { create } from "zustand";
import { Medicine, Bill } from "./types";

// Generate a unique ID (simplified version)
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get current date as ISO string
const getCurrentDate = () => new Date().toISOString();

interface StoreState {
  medicines: Medicine[];
  bills: Bill[];
  
  // Medicine actions
  addMedicine: (medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">) => void;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  getMedicine: (id: string) => Medicine | undefined;
  
  // Bill actions
  createBill: (items: BillItem[], customerName?: string, customerPhone?: string, discount?: number) => Bill;
  
  // Import/Export (for local storage persistence)
  importData: (data: { medicines: Medicine[], bills: Bill[] }) => void;
  exportData: () => { medicines: Medicine[], bills: Bill[] };
}

// Sample medicines for demo
const initialMedicines: Medicine[] = [
  {
    id: "med1",
    name: "Paracetamol 500mg",
    manufacturer: "GSK",
    price: 5.99,
    stock: 100,
    expiryDate: new Date(2024, 11, 31).toISOString(),
    category: "Pain Relief",
    description: "For fever and mild pain",
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 1, 15).toISOString()
  },
  {
    id: "med2",
    name: "Amoxicillin 250mg",
    manufacturer: "Pfizer",
    price: 12.50,
    stock: 50,
    expiryDate: new Date(2024, 10, 15).toISOString(),
    category: "Antibiotics",
    description: "For bacterial infections",
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString()
  },
  {
    id: "med3",
    name: "Loratadine 10mg",
    manufacturer: "Bayer",
    price: 8.75,
    stock: 75,
    expiryDate: new Date(2025, 3, 20).toISOString(),
    category: "Allergy",
    description: "For allergy symptoms",
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 3, 5).toISOString()
  }
];

// Import from local storage if available
const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return { medicines: initialMedicines, bills: [] };
  
  try {
    const stored = localStorage.getItem('medVaultData');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
  
  return { medicines: initialMedicines, bills: [] };
};

export const useStore = create<StoreState>((set, get) => {
  const localData = loadFromLocalStorage();
  
  return {
    medicines: localData.medicines,
    bills: localData.bills,
    
    // Medicine actions
    addMedicine: (medicine) => set(state => {
      const newMedicine = {
        ...medicine,
        id: generateId(),
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate()
      };
      
      const updatedMedicines = [...state.medicines, newMedicine];
      saveToLocalStorage({ ...state, medicines: updatedMedicines });
      
      return { medicines: updatedMedicines };
    }),
    
    updateMedicine: (id, medicine) => set(state => {
      const updatedMedicines = state.medicines.map(med => 
        med.id === id ? { 
          ...med, 
          ...medicine, 
          updatedAt: getCurrentDate() 
        } : med
      );
      
      saveToLocalStorage({ ...state, medicines: updatedMedicines });
      
      return { medicines: updatedMedicines };
    }),
    
    deleteMedicine: (id) => set(state => {
      const updatedMedicines = state.medicines.filter(med => med.id !== id);
      saveToLocalStorage({ ...state, medicines: updatedMedicines });
      
      return { medicines: updatedMedicines };
    }),
    
    getMedicine: (id) => {
      return get().medicines.find(med => med.id === id);
    },
    
    // Bill actions
    createBill: (items, customerName, customerPhone, discount = 0) => {
      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const finalAmount = totalAmount - discount;
      
      const newBill: Bill = {
        id: generateId(),
        items,
        totalAmount,
        customerName,
        customerPhone,
        date: getCurrentDate(),
        discount,
        finalAmount
      };
      
      set(state => {
        const updatedBills = [...state.bills, newBill];
        saveToLocalStorage({ ...state, bills: updatedBills });
        
        // Update stock quantities
        const updatedMedicines = state.medicines.map(medicine => {
          const billItem = items.find(item => item.medicineId === medicine.id);
          if (billItem) {
            return {
              ...medicine,
              stock: medicine.stock - billItem.quantity,
              updatedAt: getCurrentDate()
            };
          }
          return medicine;
        });
        
        return { bills: updatedBills, medicines: updatedMedicines };
      });
      
      return newBill;
    },
    
    // Import/Export
    importData: (data) => {
      saveToLocalStorage(data);
      set({ medicines: data.medicines, bills: data.bills });
    },
    
    exportData: () => ({
      medicines: get().medicines,
      bills: get().bills
    })
  };
});

// Save to local storage
function saveToLocalStorage(data: { medicines: Medicine[], bills: Bill[] }) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('medVaultData', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

// For TypeScript
export interface BillItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}
