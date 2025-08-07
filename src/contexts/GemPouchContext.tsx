'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GemPouchItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface GemPouchContextType {
  items: GemPouchItem[];
  addItem: (item: GemPouchItem) => void;
  removeItem: (id: number) => void;
  isInPouch: (id: number) => boolean;
  itemCount: number;
}

const GemPouchContext = createContext<GemPouchContextType | undefined>(undefined);

export function GemPouchProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GemPouchItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('gemPouch');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('gemPouch', JSON.stringify(items));
  }, [items]);

  const addItem = (item: GemPouchItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev; // Don't add duplicates
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isInPouch = (id: number) => {
    return items.some(item => item.id === id);
  };

  const itemCount = items.length;

  return (
    <GemPouchContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInPouch,
      itemCount
    }}>
      {children}
    </GemPouchContext.Provider>
  );
}

export function useGemPouch() {
  const context = useContext(GemPouchContext);
  if (context === undefined) {
    throw new Error('useGemPouch must be used within a GemPouchProvider');
  }
  return context;
}