import RevealText from './RevealText'

/** Numérotation éditoriale + titre révélé : « (02) Prestations ». */
export default function SectionHeading({ index, label, title, className = '', as = 'h2' }) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="section-heading__label eyebrow">
        <span className="section-heading__index">({index})</span> {label}
      </p>
      {title && (
        <RevealText as={as} className="section-heading__title">
          {title}
        </RevealText>
      )}
    </div>
  )
}
