// Gallery.tsx
import { useState, useEffect } from 'react';
import CustomCarousel from './CustomCarousel';
import { GalleryItem } from '../types/archive';
import { groupByYear, groupByLocation } from '../utils/FilterUtils';

enum GroupType {
  Year = 'Year',
  Location = 'Location',
  Keyword = 'Keyword',
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [groupType, setGroupType] = useState<GroupType>(GroupType.Year);
  const [filteredItems, setFilteredItems] = useState<Record<string, GalleryItem[]>>({});

  useEffect(() => {
    if (groupType === GroupType.Year) {
      setFilteredItems(groupByYear(items));
    } else if (groupType === GroupType.Location) {
      setFilteredItems(groupByLocation(items));
    }
    // 키워드 필터링은 추가 UI에서 사용자가 직접 입력하도록 구현할 수 있습니다.
  }, [groupType, items]);

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setGroupType(GroupType.Year)}>연도별</button>
        <button onClick={() => setGroupType(GroupType.Location)}>지역별</button>
        <button onClick={() => setGroupType(GroupType.Keyword)}>키워드별</button>
      </div>
      {Object.entries(filteredItems).map(([group, items]) => (
        <div key={group}>
          <h2>{group}</h2>
          <CustomCarousel items={items} />
        </div>
      ))}
    </div>
  );
}
