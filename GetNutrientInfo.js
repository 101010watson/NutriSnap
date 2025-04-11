// GetNutritionInfo.js

import Fuse from 'fuse.js';
import food from './NutritionDB.json' assert { type: 'json' };

// Simulated detection function (replace this with real input logic)
function getDetectedItemsFromSource() {
  return ['banana', 'grilled chicken', 'rice']; // Example input
}

const fuse = new Fuse(food, {
  keys: ['item'],
  threshold: 0.4
});

function getNutritionFuzzy(itemName) {
  const result = fuse.search(itemName);
  return result.length > 0 ? result[0].item : null;
}

function processDetectedItems(items) {
  let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  console.log("🔍 Detected Items & Matches:\n");

  items.forEach(name => {
    const match = getNutritionFuzzy(name);
    if (match) {
      console.log(`✅ "${name}" → "${match.item}"`);
      total.calories += match.calories;
      total.protein += match.protein;
      total.carbs += match.carbs;
      total.fat += match.fat;
    } else {
      console.warn(`❌ No match for "${name}"`);
    }
  });

  console.log("\n📊 Total Macros:");
  console.log(`Calories: ${total.calories.toFixed(2)} kcal`);
  console.log(`Protein:  ${total.protein.toFixed(2)} g`);
  console.log(`Carbs:    ${total.carbs.toFixed(2)} g`);
  console.log(`Fat:      ${total.fat.toFixed(2)} g`);
}

// 🛠️ Run full flow
const detectedItemsList = getDetectedItemsFromSource();
processDetectedItems(detectedItemsList);
