import {create} from 'zustand';

type EditorStore = {
  text: string;
  align: 'left' | 'center';
  setText: (text: string) => void;
  setAlign: (align: 'left' | 'center') => void;
};

const useEditorStore = create<EditorStore>(set => ({
  text: '',
  align: 'center',
  setText: text => set({text}),
  setAlign: align => set({align}),
}));

export default useEditorStore;
