import {RecipientSettingOptions} from '../types/remain';

// 등록 index 컴포넌트
export const NO_ONE_HEADLINE: string = '아직 추가된 열람인이 없습니다!';
export const NO_ONE_INFO: string = `열람인은 내가 떠나고 난 뒤,
    기록을 전달받을 사람입니다.
    버튼을 눌러 열람인을 지정해보세요!`;

// 얼람인 등록 컴포넌트
export const WRITE_INFO1: string = '열람하실 분의 성함을 입력해주세요!';
export const WRITE_INFO2: string = '열람인의 전화번호를 입력해주세요!';

// 질문 등록 컴포넌트
export const QUSETION_HEADLINE: string = '열람용 인증 질문';
export const QUSETION_INFO1: string =
  '열람인이 반드시 알만한 답변으로 구성해주세요';
export const QUSETION_INFO2: string =
  '명확하게 정답이 있는 질문으로 만들어주세요';
export const QUSETION_INFO3: string =
  '10자 이내로 답변할 수 있는 질문으로 만들어주세요';
export const QUSETION_BTN: string = '질문을 선택하세요';
export const ANSWER_HEADLINE: string = '답변';

// 결과 확인 컴포넌트
export const COMPLETE: string = '열람인 등록이 완료되었습니다!';

export const RECIPIENT_SETTING: {
  key: RecipientSettingOptions;
  label: string;
}[] = [
  {key: 'EDIT', label: '열람인 수정하기'},
  {key: 'DELETE', label: '열람인 삭제하기'},
];
