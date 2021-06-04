function findOdd(A) {
  let count = 0;
  let foundNum = 0;

  for (let i = 0; i < A.length; i++) {
    let number = A[i];
    for (let j = A.length; j >= 0; j--) {
      if (A[j] === number) {
        count++;
      }
    }
    if (count % 2 !== 0) {
      return number;
    }
  }
  return 0;
}
