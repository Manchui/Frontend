
type GroupNameInputProps = {
  error: string;
  name: string | null;
  setName: (name: string) => void;
};

export function GroupNameInput({ name, setName, error }: GroupNameInputProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue); 
  };

  const errorMessage = error==='모임 이름' ? `${error}을 입력하세요.` : error;
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900"> 모임 이름 </h2>
      <input
        value={name || ''}
        placeholder="모임 이름을 작성해주세요"
        className='mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium '
        onChange={handleChange}
      />
         {error && <p className="mt-1 text-red-500 text-sm font-medium -mb-5">{errorMessage}</p>}
    </div>

  );
}
