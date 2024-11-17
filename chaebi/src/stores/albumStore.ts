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
  selectedRecipientIdForFilter: number | null;
  setSelectedRecipientIdForFilter: (recipientId: number | null) => void;
  selectedAppMediaList: number[];
  toggleAppMediaSelection: (mediaId: number) => void;
  clearSelectedAppMediaList: () => void;
};

const useAlbumStore = create<AlbumStore>(set => ({
  selectedRecipientIdList: [],
  addRecipientsId: recipientId =>
    set(state => ({
      selectedRecipientIdList: [...state.selectedRecipientIdList, recipientId],
    })),

  removeRecipientsId: recipientId =>
    set(state => ({
      selectedRecipientIdList: state.selectedRecipientIdList.filter(
        id => id !== recipientId,
      ),
    })),

  setAllRecipients: recipientList =>
    set({selectedRecipientIdList: recipientList}),

  selectedLocalMediaList: [],
  setSelectedLocalMediaList: mediaList =>
    set({
      selectedLocalMediaList: mediaList,
    }),

  isSelectMode: false,
  setIsSelectMode: () =>
    set(state => ({
      isSelectMode: !state.isSelectMode,
    })),

  selectedAppMediaList: [],
  toggleAppMediaSelection: mediaId =>
    set(state => {
      const isAlreadySelected = state.selectedAppMediaList.includes(mediaId);
      return {
        selectedAppMediaList: isAlreadySelected
          ? state.selectedAppMediaList.filter(id => mediaId !== id)
          : [...state.selectedAppMediaList, mediaId],
      };
    }),
  clearSelectedAppMediaList: () => set({selectedAppMediaList: []}),

  selectedRecipientIdForFilter: null,
  setSelectedRecipientIdForFilter: recipientId =>
    set({selectedRecipientIdForFilter: recipientId}),
}));

export default useAlbumStore;
