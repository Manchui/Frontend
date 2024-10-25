import React, { useEffect, useState } from 'react';
import Calendar from '@/components/shared/Calendar';
import FilterDropdown from '@/components/shared/Dropdown';

const mockData = [
  { id: 1, location: '서울', date: new Date('2024-10-01'), reviews: 15 },
  { id: 2, location: '부산', date: new Date('2024-10-10'), reviews: 30 },
  { id: 3, location: '대구', date: new Date('2024-09-15'), reviews: 20 },
  { id: 4, location: '제주', date: new Date('2024-09-30'), reviews: 5 },
];

export default function Home() {
  const [locations, setLocations] = useState(['서울', '부산', '대구', '제주']);
  const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([new Date(), new Date()]);

  const [selectedLocation, setSelectedLocation] = useState<string | null>('지역전체');
  const [selectedSort, setSelectedSort] = useState<string | null>('마감임박');
  const [filteredData, setFilteredData] = useState(mockData);

  const handleDateChange = (dates: [Date, Date]) => {
    setSelectedDate(dates);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  const handleSortChange = (sortType: string) => {
    setSelectedSort(sortType);
  };

  useEffect(() => {
    let data = [...mockData];

    if (selectedLocation && selectedLocation !== '지역전체') {
      data = data.filter((item) => item.location === selectedLocation);
    }

    if (selectedDate[0] && selectedDate[1]) {
      data = data.filter((item) => item.date >= selectedDate[0] && item.date <= selectedDate[1]);
    }

    // 정렬
    if (selectedSort === '최신순') {
      data.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (selectedSort === '리뷰 높은 순') {
      data.sort((a, b) => b.reviews - a.reviews);
    } else if (selectedSort === '참여 인원 순') {
      data.sort((a, b) => b.reviews - a.reviews);
    } else if (selectedSort === '마감임박') {
      data.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    setFilteredData(data);
  }, [selectedLocation, selectedDate, selectedSort]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">필터 및 정렬 예제</h1>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          <FilterDropdown type="filter" locations={locations} onLocationChange={handleLocationChange} />
          <FilterDropdown type="filter" onDateChange={handleDateChange} />
          <FilterDropdown type="sort" onSortChange={handleSortChange} />
        </div>
      </div>

      <ul className="rounded-md border border-gray-200 p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li key={item.id} className="border-b py-2 last:border-b-0">
              {item.location} - {item.date.toLocaleDateString()} - 리뷰 수: {item.reviews}
            </li>
          ))
        ) : (
          <li className="py-2">결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
