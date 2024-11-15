import {create} from 'zustand';
import {SelectedLocalMediaType} from '../types/album';

type AlbumStore = {
  selectedRecipientIdList: number[];
  addRecipientsId: (recipientId: number) => void;
  removeRecipientsId: (recipientId: number) => void;
  setAllRecipients: (recipientList: number[]) => void;
  selectedLocalMediaList: SelectedLocalMediaType[];
  setSelectedLocalMediaList: (mediaList: SelectedLocalMediaType[]) => void;
  isSelectMode: boolean;
  setIsSelectMode: () => void;
};

const useAlbumStore = create<AlbumStore>(set => ({
  selectedRecipientIdList: [],
  addRecipientsId: (recipientId: number) =>
    set(state => ({
      selectedRecipientIdList: [...state.selectedRecipientIdList, recipientId],
    })),

  removeRecipientsId: (recipientId: number) =>
    set(state => ({
      selectedRecipientIdList: state.selectedRecipientIdList.filter(
        id => id !== recipientId,
      ),
    })),

  setAllRecipients: (recipientList: number[]) =>
    set({selectedRecipientIdList: recipientList}),

  selectedLocalMediaList: [],
  setSelectedLocalMediaList: (mediaList: SelectedLocalMediaType[]) =>
    set({
      selectedLocalMediaList: mediaList,
    }),

  isSelectMode: false,
  setIsSelectMode: () =>
    set(state => ({
      isSelectMode: !state.isSelectMode,
    })),
}));

export default useAlbumStore;
