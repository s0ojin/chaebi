import { Chaebi } from '../../public/svg/index'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Chaebi />
      <div className="mt-5 text-xl text-_white mb-1">남은 이들을 위한 채비</div>
      <div className="text-xl text-_white mb-8">
        <span className="font-bold">채</span>우고,{' '}
        <span className="font-bold">비</span>우기
      </div>
    </div>
  )
}
