import {create} from 'zustand';
import {SelectedMediaType} from '../types/album';

type AlbumStore = {
  selectedRecipientIdList: number[];
  addRecipientsId: (recipientId: number) => void;
  removeRecipientsId: (recipientId: number) => void;
  setAllRecipients: (recipientList: number[]) => void;
  selectedMediaList: SelectedMediaType[];
  setSelectedMediaList: (mediaList: SelectedMediaType[]) => void;
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

  selectedMediaList: [],
  setSelectedMediaList: (mediaList: SelectedMediaType[]) =>
    set({
      selectedMediaList: mediaList,
    }),
}));

export default useAlbumStore;
