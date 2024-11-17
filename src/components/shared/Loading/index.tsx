export default function Loading() {
  const text = 'LOADING...';

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-title-response font-bold">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block animate-bounce"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
