export default function FloralOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="3" fill="#D4AF37" opacity="0.6" />
      <ellipse cx="60" cy="45" rx="3" ry="14" fill="#D4AF37" opacity="0.25" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="45" rx="3" ry="14" fill="#0F766E" opacity="0.2" transform="rotate(72 60 60)" />
      <ellipse cx="60" cy="45" rx="3" ry="14" fill="#B45F4F" opacity="0.2" transform="rotate(144 60 60)" />
      <ellipse cx="60" cy="45" rx="3" ry="14" fill="#D4AF37" opacity="0.2" transform="rotate(216 60 60)" />
      <ellipse cx="60" cy="45" rx="3" ry="14" fill="#0F766E" opacity="0.2" transform="rotate(288 60 60)" />
      <circle cx="60" cy="60" r="1.5" fill="#D4AF37" opacity="0.8" />
    </svg>
  )
}
