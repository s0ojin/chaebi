// // ToastContext.tsx
// import React, {createContext, useContext, useState, ReactNode} from 'react';
// import {Animated, StyleSheet, Text} from 'react-native';

// interface ToastContextType {
//   showToast: (message: string) => void;
// }

// interface ToastProviderProps {
//   children: ReactNode;
// }

// // ToastContext 생성
// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// // 커스텀 훅
// export const useToast = (): ToastContextType => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// };

// export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
//   const [toast, setToast] = useState<{message: string; isVisible: boolean}>({
//     message: '',
//     isVisible: false,
//   });
//   const [fadeAnim] = useState(new Animated.Value(0));

//   const showToast = (message: string) => {
//     setToast({message, isVisible: true});
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     setTimeout(() => {
//       hideToast();
//     }, 3000); // 3초 후에 토스트 숨기기
//   };

//   const hideToast = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setToast({message: '', isVisible: false}));
//   };

//   return (
//     <ToastContext.Provider value={{showToast}}>
//       {children}
//       {toast.isVisible && (
//         <Animated.View style={[styles.toast, {opacity: fadeAnim}]}>
//           <Text style={styles.toastText}>{toast.message}</Text>
//         </Animated.View>
//       )}
//     </ToastContext.Provider>
//   );
// };

// // 스타일 정의
// const styles = StyleSheet.create({
//   toast: {
//     position: 'absolute',
//     bottom: 50,
//     left: '50%',
//     transform: [{translateX: -100}],
//     width: 200,
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   toastText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

interface ToastContextType {
  showToast: (message: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

// ToastContext 생성
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 커스텀 훅
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const [toast, setToast] = useState<{message: string; isVisible: boolean}>({
    message: '',
    isVisible: false,
  });
  const [translateYAnim] = useState(new Animated.Value(50)); // 초기 위치를 50으로 설정

  const showToast = (message: string) => {
    setToast({message, isVisible: true});
    Animated.timing(translateYAnim, {
      toValue: 0, // 화면에 완전히 보이게 할 위치
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 3000); // 3초 후에 토스트 숨기기
  };

  const hideToast = () => {
    Animated.timing(translateYAnim, {
      toValue: 100, // 다시 아래로 내려가도록 설정
      duration: 300,
      useNativeDriver: true,
    }).start(() => setToast({message: '', isVisible: false}));
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast.isVisible && (
        <Animated.View
          style={[styles.toast, {transform: [{translateY: translateYAnim}]}]}>
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 20,
    transform: [{translateX: -100}],
    left: '1%',
    width: '98%',
    backgroundColor: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});
