const fs = require('fs');

const buildCamareiros = list => list.map(camareiro => ({
    nome: camareiro,
    protegidos: [],
  }));

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const distribute = (camareiros, camaristas) => {
  if (camaristas.length === 0) {
    return camareiros;
  }

  camareiros = shuffle(camareiros);
  
  camareiros.forEach((camareiro) => {
    if (camaristas.length === 0) {
      return;
    }

    camareiro.protegidos.push(camaristas[0]);
    camaristas.splice(0, 1);
  });

  return distribute(camareiros, camaristas);
};

const start = () => {
  const arrayCamareiros = JSON.parse(fs.readFileSync('./camareiros.json', 'utf8'));
  const camaristas = JSON.parse(fs.readFileSync('./camaristas.json', 'utf8'));

  let camareiros = buildCamareiros(arrayCamareiros);
  
  const result = distribute(camareiros, camaristas);
  console.log(result);
};

start();
