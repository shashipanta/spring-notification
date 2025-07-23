import type { ZodError } from "zod";

// regex for placeholder
const placeholderRegex = /\{.*?\}/;

export const replacePlaceHolders = (error: ZodError) => {
  console.log("THIS IS THE ZOD ERROR : ", error);

  // replacement logic goes here
  let message: string = "";
  let placeHolder: string | number = "";

  // Iterate over the errors
  error.errors.forEach((validationError) => {
    // change message if there is placeholder
    console.log("VALiDATION ERROR : ", validationError);
    message = validationError.message;
    if (placeholderRegex.test(message)) {
      console.log("Validation contains placeholdar");
      // placeHolder = "{" + validationError.
      // message.replace("{" + "}")
    }
    console.log(validationError.path, validationError.message);
  });

  return error;
};
