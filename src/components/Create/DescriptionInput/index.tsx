type DescriptionInputProps = {
  description: string | null;
  error: string;
  setDescription: (description: string) => void;
};

export function DescriptionInput({ description, setDescription, error }: DescriptionInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaValue = e.target.value;
    setDescription(textAreaValue);
  };

  const errorMessage = error === '모임 설명' ? `${error}을 입력하세요.` : error;
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 모임 설명 </h2>
      <textarea
        value={description || ''}
        placeholder="모임에 대한 설명을 작성해주세요."
        className="min-h-40 w-full resize-none rounded-xl border border-blue-100 bg-blue-50 pl-2 pt-3 text-sm font-medium"
        onChange={handleChange}
      />
      {error && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{errorMessage}</p>}
    </div>
  );
}
