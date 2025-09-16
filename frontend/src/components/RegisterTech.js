export default function RegisterTech() {
  async function registerTechnology(formData) {
    "use server";
    const techId = formData.get("techId");
    const name = formData.get("techName");
  }
  return (
    <div>
      <h3>Register new technology</h3>
      <form action={registerTechnology}>
        <input type="hidden" name="techId" />
        <label for="techName">Name of technology: </label>
        <input type="text" name="techName" required />
        <label for="techCategory">Choose a category: </label>
        <select name="techCategory" required>
          <option value="techniques">Techniques</option>
          <option value="tools">Tools</option>
          <option value="platforms">Platforms</option>
          <option value="languages">Languages</option>
          <option value="frameworks">Frameworks</option>
        </select>
        <label for="techMaturity">Enter the maturity: </label>
        <select name="techMaturity" required>
          <option value="assess">Assess</option>
          <option value="trial">Trial</option>
          <option value="adopt">Adopt</option>
          <option value="hold">Hold</option>
        </select>
        <label for="techDescription">
          Describe the technology in a few words.
        </label>
        <textarea name="techDescription" required />
        <label for="techClassification">
          Classify the technology in a few words.
        </label>
        <textarea name="techClassification" required />
        <button type="submit">Register technology</button>
      </form>
    </div>
  );
}
