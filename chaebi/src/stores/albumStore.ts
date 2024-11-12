import {create} from 'zustand';

type AlbumStore = {
  selectedRecipientIdList: number[];
  addRecipientsId: (recipientId: number) => void;
  removeRecipientsId: (recipientId: number) => void;
  setAllRecipients: (recipientList: number[]) => void;
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
}));

export default useAlbumStore;
