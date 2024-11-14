export type GuideMessageProps = {
  senderName: string
  receiverName: string
}

export type GuideContentProps = {
  onNextClick: () => void
  enterCode: string
  setEnterCode: (code: string) => void
}
