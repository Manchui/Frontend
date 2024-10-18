import Tag from '@/components/shared/Tag';

export default function Home() {
  return (
    <div className="mx-5 flex flex-col gap-4">
      <div className="relative h-[180px] w-[343px] rounded-3xl border-2 mobile:rounded-tr-[0px]">
        <Tag Type="default" className="absolute right-0 top-0" Hour={9} />
        <div className="absolute inset-0 z-[-1] rounded-3xl bg-black mobile:rounded-tr-[0px]" />
      </div>
      <div className="relative h-[180px] w-[343px] rounded-3xl border-2">
        <Tag Type="detail" className="absolute right-0 top-0" Hour={2} />
        <div className="absolute inset-0 z-[-1] rounded-3xl bg-black" />
      </div>
    </div>
  );
}
