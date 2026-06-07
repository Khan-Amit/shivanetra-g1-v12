export function calculateChineseZodiac(dobString) {
  const dob = new Date(dobString);
  const year = dob.getFullYear();
  const zodiacs = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  
  const digits = dobString.replace(/-/g, "");
  const activeDigits = [...new Set([...digits])].map(Number).filter(n => n > 0);

  return {
    zodiac: isNaN(year) ? "Unknown" : zodiacs[(year - 4) % 12],
    loShuActive: activeDigits
  };
}
