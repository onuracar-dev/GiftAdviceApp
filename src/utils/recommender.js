import { gifts } from '../data/gifts';

/**
 * Recommends gifts based on user preferences.
 * 
 * @param {Object} preferences
 * @param {string} preferences.persona - Target recipient persona (e.g., 'geek', 'artist')
 * @param {string} preferences.budget - Target budget (e.g., 'breadcrumbs', 'coins', 'chest')
 * @param {string} preferences.occasion - Occasion (e.g., 'birthday', 'anniversary')
 * @param {string} preferences.relationship - Relationship closeness (e.g., 'partner', 'friend')
 * @returns {Array<Object>} Sorted list of matching gifts
 */
export function getRecommendations(preferences) {
  const { persona, budget, occasion, relationship } = preferences;

  // 1. Try strict filtering (Persona AND Budget must match)
  let filtered = gifts.filter(gift => {
    const personaMatch = gift.tags.personas.includes(persona);
    const budgetMatch = gift.tags.budgets.includes(budget);
    return personaMatch && budgetMatch;
  });

  // 2. If no strict match, relax budget filter (find same persona, any budget)
  if (filtered.length === 0) {
    filtered = gifts.filter(gift => gift.tags.personas.includes(persona));
  }

  // 3. If still no match (shouldn't happen with our rich dataset), return all gifts
  if (filtered.length === 0) {
    filtered = [...gifts];
  }

  // 4. Score remaining gifts based on Occasion and Relationship to find the perfect fit
  const scoredGifts = filtered.map(gift => {
    let score = 10; // Base score

    // Occasion bonus
    if (gift.tags.occasions && gift.tags.occasions.includes(occasion)) {
      score += 5;
    }

    // Relationship bonus
    if (gift.tags.relationships && gift.tags.relationships.includes(relationship)) {
      score += 5;
    }

    // Occasion match for DIY gifts is extra special if budget is low
    if (budget === 'breadcrumbs' && gift.id.startsWith('diy_')) {
      score += 3;
    }

    return {
      ...gift,
      score
    };
  });

  // 5. Sort by score descending
  scoredGifts.sort((a, b) => b.score - a.score);

  return scoredGifts;
}
