console.log(generation(-3, "m"));
console.log(generation(-2, "f"));
console.log(generation(-1, "m"));
console.log(generation(0, "f"));
console.log(generation(1, "m"));
console.log(generation(2, "f"));
console.log(generation(3, "m"));

function generation(gen, gender) {
  let olderGen = gen < 0;
  let resultString = "";
  let isMale = gender == "m";
  let tempGen = gen;

  if (gen === 0) {
    return "me!";
  } else if (gen === -1) {
    resultString += isMale ? "Father" : "mother";
    return resultString;
  } else if (gen === 1) {
    resultString += isMale ? "son" : "daughter";
    return resultString;
  } else {
    for (let i = 0; i < Math.abs(gen) - 1; i++) {
      if (Math.abs(tempGen) <= 2) {
        resultString += "grand";
      } else {
        resultString += "great-";
      }
      tempGen = Math.abs(tempGen) - 1;
    }
    olderGen
      ? !isMale
        ? (resultString += "mother")
        : (resultString += "father")
      : !isMale
      ? (resultString += "daughter")
      : (resultString += "son");
  }

  return resultString;
}
