import Tag from '@/components/shared/Tag';

export default function Home() {
  return (
    <div className="mx-5 flex space-x-3">
      <Tag Type="default" Hour={9} />
      <Tag Type="Detail" Hour={2} />
    </div>
  );
}
