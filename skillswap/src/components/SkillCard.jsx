import { useState } from "react";

function SkillCard({ title, description, price, provider }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`skill-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => console.log(`Hovered on ${title}`)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Provider:</strong> {provider}</p>

      {expanded && (
        <div className="extra-info">
          <p>More details coming soon!</p>
        </div>
      )}
    </div>
  );
}

export default SkillCard;
