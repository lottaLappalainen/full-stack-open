interface MultiplyValues {
    height: number;
    weight: number;
  }
  
  const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  export const calculateBmi = (height: number, weight: number): string => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    if (bmi > 25) {
        return("Overweight");
    }
    else if (bmi < 18.5) {
        return("Underweight");
    }
    else {
        return("Normal range");
    }
  };
  
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }