import Tag from '@/components/Tag';

export default function Home() {
  return (
    <div className="mx-5 flex space-x-3">
      <Tag Variant="Search" Hour={9} />
      <Tag Variant="Detail" Hour={2} />
    </div>
  );
}
