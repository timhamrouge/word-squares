const WordSquareSolver = require('.');

async function runWordSquareSolver(wordLength, characters) {
  const solver = new WordSquareSolver(wordLength, characters)

  await solver.getValidEnglishAnagrams()

  console.log('solver', solver)
  console.log(solver.solve())
  solver.solve()
};

console.log(runWordSquareSolver(4, 'aaccdeeeemmnnnoo'));