import { create } from 'zustand';

interface State {
    vw: number;
    updateVw: () => void;
}

export const useStore = create<State>(set => ({
    vw: 0,
    updateVw: () => {
        const vw = (window.visualViewport?.width ?? window.innerWidth) / 100;
        const vh = (window.visualViewport?.height ?? window.innerHeight) / 100;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);

        set({ vw });
    },
}));
