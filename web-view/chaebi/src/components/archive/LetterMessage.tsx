import { SoBangGwan } from '@/utils/fonts'
import TopEmblem from 'public/svg/top-emblem.svg'
import BottomEmblem from 'public/svg/bottom-emblem.svg'

export default function LetterMessage() {
  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      <div className="mt-2 px-1">
        <TopEmblem className="w-full" />
      </div>
      <div className={`${SoBangGwan.variable} font-SoBangGwan p-3 text-xs`}>
        내 제사를 열심히 지내라. 내 제사상에는 샤인머스켓, 수플레 팬케이크,
        옥수수이야기빵, 생크림 듬뿍 카스테라, 타로밀크티를 올려줘. 타로밀크티는
        디저트39 슬림타로밀크티로 부타켕~~~~~~~~~~
      </div>
      <div className="mb-2 px-1">
        <BottomEmblem className="w-full" />
      </div>
    </div>
  )
}
