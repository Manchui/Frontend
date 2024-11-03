type GroupNameInputProps = {
  name: string | null;
  setName: (name: string) => void;
};

export function GroupNameInput({ name, setName }: GroupNameInputProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900"> 모임 이름 </h2>
      <input
        value={name || ''}
        placeholder="모임 이름을 작성해주세요"
        className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
    </div>
  );
}
