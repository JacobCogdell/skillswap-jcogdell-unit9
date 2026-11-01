import { useState, useEffect } from "react";
import {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} from "../skillswap-functions.js";
import SkillCard from "../components/SkillCard";
import { fetchSkills, createSkill } from "../services/apiService";

function Home() {
  const [skills, setSkills] = useState([]);

  const [newSkill, setNewSkill] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  async function loadSkills() {
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredSkills = filterSkillsByCategory(skills, selectedCategory);

  // Cost calculator state
  const [rate, setRate] = useState("");
  const [hours, setHours] = useState("");
  const [totalCost, setTotalCost] = useState(null);

  function handleCalculate() {
    const result = calculateTotalCosts(Number(rate), Number(hours));
    setTotalCost(result);
  }

  // Match Skills state
  const [matchCategory, setMatchCategory] = useState("");
  const [matchPrice, setMatchPrice] = useState("");
  const [matchedSkills, setMatchedSkills] = useState([]);

  function handleMatchSkills() {
    const userNeeds = {
      category: matchCategory,
      maxPrice: Number(matchPrice)
    };

    const result = matchSkillsToUser(userNeeds, skills);
    setMatchedSkills(result);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createSkill(newSkill);

      await loadSkills();
      
      setNewSkill({
        title: "",
        category: "",
        price: "",
        description: "",
      });

    } catch (error) {
      console.error("Failed to create skill:", error);
    }
  }

  return (
    <main>
      <section className="hero">
        <h2>Welcome to Skill Swap</h2>
        <p>Exchange skills. Learn from others. Grow together.</p>
      </section>

      <section className="create-skill-section">
        <h3>Add a Skill</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newSkill.title}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newSkill.category}
            onChange={handleInputChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newSkill.price}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newSkill.description}
            onChange={handleInputChange}
            required
          />

          <button type="submit">
            Create Skill
          </button>
        </form>
      </section>

      <section className="skills-section">
        <h3>Available Skills</h3>

        <div className="filters">
          <button onClick={() => setSelectedCategory("All")}>All</button>
          <button onClick={() => setSelectedCategory("Programming")}>
            Programming
          </button>
          <button onClick={() => setSelectedCategory("Music")}>
            Music
          </button>
          <button onClick={() => setSelectedCategory("Career")}>
            Career
          </button>
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={`Category: ${skill.category}`}
              price={skill.price}
              provider="Skill Provider"
            />
  ))}
        </div>
      </section>

      <section className="cost-section">
        <h3>Cost Calculator</h3>

        <div className="cost-form">
          <label>
            Hourly Rate:
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </label>

          <label>
            Hours:
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </label>

          <button onClick={handleCalculate}>
            Calculate
          </button>
        </div>

        {totalCost !== null && (
          <p className="cost-result">
            Total Cost: ${totalCost}
          </p>
        )}
      </section>

      <section className="match-section">
        <h3>Find My Match</h3>

        <div className="match-form">
          <label>
            Preferred Category:
            <input
              type="text"
              value={matchCategory}
              onChange={(e) => setMatchCategory(e.target.value)}
              placeholder="e.g., Programming"
            />
          </label>

          <label>
            Maximum Price:
            <input
              type="number"
              value={matchPrice}
              onChange={(e) => setMatchPrice(e.target.value)}
              placeholder="e.g., 25"
            />
          </label>

          <button onClick={handleMatchSkills}>
            Find Match
          </button>
        </div>

        <div className="skills-grid">
          {matchedSkills.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={`Category: ${skill.category}`}
              price={skill.price}
              provider="Skill Provider"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;