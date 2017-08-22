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

const sortCamareiros = camareiros => camareiros.sort((first, second) => {
    if(first.nome < second.nome) {
      return -1;
    }

    if(first.nome > second.nome) {
      return 1;
    }
    
    return 0;
  });


const printResult = (camareiros) => {
  camareiros.forEach((camareiro) => {
    console.log('\n');
    console.log(`O camareiro(a): ${camareiro.nome} deverá dedicar suas orações para:\n`);
    camareiro.protegidos.forEach((protegido) => {
      console.log(`\t-${protegido.nome} (${protegido.ano}o ${protegido.turma})`);
    });
  });
};

const start = () => {
  const arrayCamareiros = JSON.parse(fs.readFileSync('./camareiros.json', 'utf8'));
  const camaristas = JSON.parse(fs.readFileSync('./camaristas.json', 'utf8'));

  let camareiros = buildCamareiros(arrayCamareiros);
  
  const result = distribute(camareiros, camaristas);
  const sortedResult = sortCamareiros(result);

  printResult(sortedResult);
};

start();
