interface ResultValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

  interface ArgValues {
    days: number[],
    target: number
   }

  const parseArguments = (args: string[]): ArgValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const days = args.slice(3).map(Number);

    return {
      target,
      days,
    };
  };

  export const calculateExercises = (trainingArray: number[], target: number): ResultValues => {
    const periodLength = trainingArray.length;
    const trainingDays = trainingArray.filter(day => day > 0).length;
    const totalHours = trainingArray.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (success) {
        rating = 3;
        ratingDescription = "Great job";
    }
    else if (target - average < 1) {
        rating = 2;
        ratingDescription = "Mid job";
    }
    else {
        rating = 1;
        ratingDescription = "Bad job"; 
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      };
  };

  
  try {
    const { days, target } = parseArguments(process.argv);
    const result = calculateExercises(days, target);
    console.log(days);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }