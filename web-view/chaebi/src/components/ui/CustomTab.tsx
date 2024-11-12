import { useState } from 'react'
import { Tab } from '@/types/tab'

const initialTabs: Tab[] = [
  { name: '편지', current: true },
  { name: '앨범', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function handleTabClick(tabs: Tab[], clickedTabName: string) {
  return tabs.map((tab) => {
    return {
      ...tab,
      current: tab.name === clickedTabName,
    }
  })
}

export default function CustomTab({
  onTabChange,
}: {
  onTabChange: (tabName: string) => void
}) {
  const [tabs, setTabs] = useState(initialTabs)

  function onTabClick(clickedTabName: string) {
    setTabs((prevTabs) => handleTabClick(prevTabs, clickedTabName))
    onTabChange(clickedTabName)
  }

  return (
    <div>
      <nav aria-label="Tabs" className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabClick(tab.name)}
            aria-current={tab.current ? 'page' : undefined}
            className={classNames(
              tab.current ? 'bg-_gray-300 text-_white' : 'text-_white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  )
}
