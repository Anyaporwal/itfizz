function StatCard({ id, value, description, position, variant, boxRef }) {
  return (
    <div
      ref={boxRef}
      id={id}
      className={`stat-card stat-card--${variant}`}
      style={position}
      aria-hidden={false}
    >
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__description">{description}</span>
    </div>
  )
}

export default StatCard
