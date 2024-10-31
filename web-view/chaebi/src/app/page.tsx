import { Chaebi } from '../../public/svg/index'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Chaebi />
      <div className="mt-5 text-xl text-gray-700 mb-1">
        남은 이들을 위한 채비
      </div>
      <div className="text-xl text-gray-700 mb-8">채우고, 비우기</div>
    </div>
  )
}
