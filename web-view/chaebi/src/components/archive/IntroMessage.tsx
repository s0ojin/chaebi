import { GuideMessageProps } from '@/types/guide'

export default function ArchiveMessage({
  senderName,
  receiverName,
}: GuideMessageProps) {
  return (
    <div className="text-xl text-_white text-center leading-9">
      {senderName} 님께서 {receiverName} 님을 위해
      <br />
      남기신 기록입니다.
    </div>
  )
}
