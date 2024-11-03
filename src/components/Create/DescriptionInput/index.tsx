type DescriptionInputProps = {
  description: string | null;
  setDescription: (description: string) => void;
};

export function DescriptionInput({ description, setDescription }: DescriptionInputProps) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 모임 설명 </h2>
      <textarea
        value={description || ''}
        placeholder="모임에 대한 설명을 작성해주세요."
        className="min-h-40 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 pt-3 text-sm font-medium"
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
