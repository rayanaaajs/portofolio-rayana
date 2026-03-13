export default function ShinyText({ text, className = '', speed = '4s' }) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{ animationDuration: speed }}
    >
      {text}
    </span>
  );
}
