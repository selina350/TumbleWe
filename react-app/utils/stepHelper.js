export const sortSteps = (stepsArray) => {
  return stepsArray.sort((stepA, stepB) => {
    if (stepA.order > stepB.order) {
      return 1;
    } else if (stepA.order < stepB.order) {
      return -1;
    }
    return 0;
  });
};
