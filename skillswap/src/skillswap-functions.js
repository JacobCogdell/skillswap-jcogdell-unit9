// --- Function 1: Filter Skills ---
export function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

// --- Function 2: Calculate Total Costs ---
export function calculateTotalCosts(rate, hours) {
  return rate * hours;

}

// --- Function 3: Match Skills to User ---
export function matchSkillsToUser(userNeeds, skills) {
  const { category, maxPrice } = userNeeds;

  return skills.filter(skill =>
    skill.category === category &&
    skill.price <= maxPrice
  );

}
