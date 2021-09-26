type FieldValidatorType = (inputValue: string) => string | null;

export const requiredField: FieldValidatorType = (inputValue) => {
  if (inputValue) {
    return null;
  } else {
    return "Field is required";
  }
};
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (
  inputValue
) => {
  if (inputValue.length <= maxLength) {
    return null;
  } else {
    return `Max length is ${maxLength} symbols`;
  }
}; // HOF

export const maxLength100 = maxLengthCreator(100);
