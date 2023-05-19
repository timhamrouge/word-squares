// JS is definitely not the lanugage to attempt this with but it's my go to so let's give it a go
const { findPartialAnagrams } = require('find-partial-anagrams');

module.exports =  class WordSquareSolver {
  constructor(wordLength, letters) {
    this.wordLength = wordLength
    this.letters = letters;
    this.validAnagrams = [];
  }

  async getValidEnglishAnagrams() {
    const response = await fetch('http://norvig.com/ngrams/enable1.txt');
    const text = await response.text();
    this.validAnagrams = findPartialAnagrams(this.letters, text.split('\n')).filter((word) => word.length === this.wordLength);
  };

  getRemainingChars(combo) {
    const usedChars = combo.join("");
    let remainingChars = this.letters; 
  
    for(let i = 0; i < usedChars.length; i++) {
      const indexOfChar = remainingChars.indexOf(usedChars[i]);
      remainingChars = remainingChars.replace(remainingChars[indexOfChar], '');
    }

    return remainingChars;
  };

  getRemainingPartialAnagrams (combo) {
    const remainingCharacters = this.remainingChars(combo);
    if (!remainingCharacters) return [];

    const partialAnagrams = findPartialAnagrams(remainingCharacters,validWords.filter((word) => word.length === wordLength));
    return partialAnagrams;
  };

  checkIfCombinationValid(row, combo) {
    if(row === combo.length) {
      return combo.join('')
    }
    
    for(let i = 0; i < combo[row].length; i++) {
      let isValid = true;
  
      if(combo[row][i] !== combo[i][row]) {
        isValid = false;
      }
      if (isValid) {
        if(checkIfValid(row + 1, combo)) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  isWordSquare(combination) {
    const words = combination.split(',');
    const n = words.length;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (words[i][j] !== words[j][i]) {
          return false;
        }
      }
    }
  
    return true;
  };

  getCombinations() {
    const combinations = [];
    const wordLength = this.wordLength;
    function backtrack(currentCombo, remainingWords) {
      if (currentCombo.length === wordLength) {
        combinations.push(currentCombo.join(','));
        return;
      }
  
      for (let i = 0; i < remainingWords.length; i++) {
        const word = remainingWords[i];
        const newCombo = [...currentCombo, word];
  
        if (!this.checkIfCombinationValid(0, newCombo)) continue;
          
        const newRemainingWords = this.getRemainingPartialAnagrams(newCombo);
        backtrack(newCombo, newRemainingWords);
      }
    }
  
    backtrack([], this.validAnagrams);

    return combinations;
  };

  solve() {
    const combinations = this.getCombinations();

    console.log(combinations)
    for(let i = 0; i < combinations.length; i++) {
      if (this.isWordSquare(combination)) {
        return combination
      }
    }

    return 'not a word square'
  }
}