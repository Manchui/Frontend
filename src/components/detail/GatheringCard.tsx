import type { DetailData } from '@/types/detail';

import DateChip from '../shared/chip/DateChip';
import { ProgressBar } from '../shared/progress-bar';

export function GatheringCard({ PAGE_DATA }: { PAGE_DATA: DetailData }) {
  const gatheringDate = new Date(PAGE_DATA.gatheringDate);

  return (
    <div className="m-4 h-48 min-w-80 rounded-2xl border-2 p-4">
      <div>
        <h1 className="text-lg font-bold">{PAGE_DATA.groupName}</h1>
        <p>{PAGE_DATA.location}</p>
        <DateChip dateTime={gatheringDate} />
      </div>
      <hr className="my-2 border-dashed" />
      <div>
        <ProgressBar maxValue={10} value={5} design="details" userList={PAGE_DATA.usersList} />
      </div>
    </div>
  );
}
