function PartyPopper({ side }) {
  return (
    <div className={`party-popper party-popper-${side}`} aria-hidden="true">
      <span className="party-popper-emoji">🎉</span>
      <span className="party-confetti party-confetti-one" />
      <span className="party-confetti party-confetti-two" />
      <span className="party-confetti party-confetti-three" />
      <span className="party-confetti party-confetti-four" />
      <span className="party-confetti party-confetti-five" />
    </div>
  )
}

export default function Celebration({ location }) {
  return (
    <div className={`celebration celebration-${location}`} aria-hidden="true">
      <PartyPopper side="left" />
      <PartyPopper side="right" />
    </div>
  )
}