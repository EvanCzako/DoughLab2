import { create } from 'zustand';

interface FontState {
    fontSize: number;
    setFontSize: (size: number) => void;
}

export const useStore = create<FontState>(set => ({
    fontSize: 30,
    setFontSize: (size: number) => set({ fontSize: size }),
}));
