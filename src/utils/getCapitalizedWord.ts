const getCapitalizedWord = <T extends string>(word: T): T => {
  if (word.length > 3) {
    const titleFirstLetter = word.charAt(0).toUpperCase();
    return (titleFirstLetter + word.slice(1)) as T;
  } else {
    return word.toUpperCase() as T;
  }
};

export default getCapitalizedWord;
