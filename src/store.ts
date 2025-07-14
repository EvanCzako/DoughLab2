import { create } from 'zustand';

interface FontState {
    fontSize: number;
    setFontSize: (size: number) => void;
}

export const useStore = create<FontState>(set => ({
    fontSize: 25,
    setFontSize: (size: number) => set({ fontSize: size }),
}));
