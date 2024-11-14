export type GuideMessageProps = {
  senderName: string
  receiverName: string
}

export type GuideContentProps = {
  enterCode: string
  setEnterCode: (code: string) => void
}
