import { useState, useEffect } from 'react'
import { Tab } from '@/types/tab'

interface TabButtonProps {
  name: string
  isActive: boolean
  onClick: (name: string) => void
}

interface TabIndicatorProps {
  activeTabName: string
}

interface TabsProps {
  onTabChange: (tabName: string) => void
}

const TABS: Tab[] = [
  { name: '편지', current: true },
  { name: '앨범', current: false },
]

function TabButton({ name, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`
        text-xl font-medium transition-colors
        ${isActive ? 'text-primary' : 'text-gray-500'}
      `}
    >
      {name}
    </button>
  )
}

function TabIndicator({ activeTabName }: TabIndicatorProps) {
  return (
    <div
      className={`
        absolute bg-white rounded-3xl h-[2.125rem] mt-[.1875rem]
        transition-transform duration-300 ease-in-out
        ${activeTabName === '편지' ? 'translate-x-[3px]' : 'translate-x-[calc(6.25rem+3px)]'}
      `}
      style={{ width: 'calc(6.25rem - 6px)' }}
    />
  )
}

function TabNavigation({
  tabs,
  activeTab,
  onTabClick,
}: {
  tabs: Tab[]
  activeTab: string
  onTabClick: (name: string) => void
}) {
  return (
    <nav className="relative grid h-full grid-cols-2">
      {tabs.map((tab) => (
        <TabButton
          key={tab.name}
          name={tab.name}
          isActive={activeTab === tab.name}
          onClick={onTabClick}
        />
      ))}
    </nav>
  )
}

export default function CustomTab({ onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0].name)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleTabClick(tabName: string) {
    setActiveTab(tabName)
    onTabChange(tabName)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-[12.5rem] h-10 bg-gray-300 rounded-3xl z-10">
      <TabIndicator activeTabName={activeTab} />
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
    </div>
  )
}
