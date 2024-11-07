import {create} from 'zustand';

type EditorStore = {
  text: string;
  setText: (text: string) => void;
};

const useEditorStore = create<EditorStore>(set => ({
  text: '',
  setText: text => set({text}),
}));

export default useEditorStore;
