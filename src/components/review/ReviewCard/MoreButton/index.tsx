import Image from 'next/image';

type MoreButtonProps = {
  isExpanded: boolean;
  onClick: () => void;
};

export default function MoreButton({ isExpanded, onClick }: MoreButtonProps) {
  
  return (
    <button type="button" className=" text-sm text-blue-700  duration-100 whitespace-nowrap flex items-center  " onClick={onClick}>
      {isExpanded ? '접기' : '더보기'}
      <Image 
        src="/icons/down.svg" 
        alt="^" 
        width={18} 
        height={18} 
        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
      />
    </button>
  );
}
