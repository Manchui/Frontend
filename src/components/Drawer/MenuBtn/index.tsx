type MenuBtnProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};
export default function MenuBtn({ isActive, setIsActive }: MenuBtnProps) {
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="relative inline-block size-6 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        toggleMenu();
      }}
    >
      <span
        className={`block h-[2px] w-full rounded bg-gray-800 transition-all duration-300 ${isActive ? 'animate-active-hamburgerone' : 'animate-hamburgerone'}`}
      />
      <span className={`mt-1.5 block h-[2px] w-full rounded bg-gray-800 transition-all ${isActive ? 'animate-active-hamburgertwo' : 'animate-hamburgertwo'}`} />
      <span
        className={`mt-1.5 block h-[2px] w-full rounded bg-gray-800 transition-all duration-300 ${isActive ? 'animate-active-hamburgerthree' : 'animate-hamburgerthree'}`}
      />
    </div>
  );
}
