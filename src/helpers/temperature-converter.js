export const temperatureConverter = (value, convertToUnit, currentUnit) => {
  if (currentUnit !== convertToUnit) {
    switch (convertToUnit) {
      case 'F': {
        // C to F
        return (value * 9 / 5 + 32).toFixed();
      }
      case 'C': {
        // F to C
        return ((value - 32) * 5 / 9).toFixed();
      }
      default: {
        return value.toFixed();
      }
    }
  }
  return value.toFixed();
}
