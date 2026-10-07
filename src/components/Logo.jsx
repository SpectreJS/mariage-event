export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__mark">Maison</span>
      <span className="logo__name">Aurèle</span>
    </span>
  )
}
