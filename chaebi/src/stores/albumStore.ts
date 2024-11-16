import {create} from 'zustand';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {DocumentPickerResponse} from 'react-native-document-picker';

type AlbumStore = {
  selectedRecipientIdList: number[];
  addRecipientsId: (recipientId: number) => void;
  removeRecipientsId: (recipientId: number) => void;
  setAllRecipients: (recipientList: number[]) => void;
  selectedLocalMediaList: (ImageOrVideo | DocumentPickerResponse)[];
  setSelectedLocalMediaList: (
    mediaList: (ImageOrVideo | DocumentPickerResponse)[],
  ) => void;
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
  setSelectedLocalMediaList: (
    mediaList: (ImageOrVideo | DocumentPickerResponse)[],
  ) =>
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
