import {useState, useCallback} from 'react';

interface UseModalReturnType {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useModal(): UseModalReturnType {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => setIsVisible(true), []);
  const closeModal = useCallback(() => setIsVisible(false), []);

  return {isVisible, openModal, closeModal};
}
