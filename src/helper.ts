import { Field } from "./features/formSlice";
export const validateField = (
  field: Field,
  value: string
): { validate: boolean; validateError: string } => {
  if (field.validation.includes("required") && !value.trim()) {
    return { validate: false, validateError: "This field is required" };
  }

  if (field.validation.includes("number")) {
    if (isNaN(Number(value))) {
      return { validate: false, validateError: "Must be a number" };
    }
    if (field.id === "zipcode" && value.length !== 6) {
      return {
        validate: false,
        validateError: "Zipcode must be exactly six digits",
      };
    }
    if (field.id === "mobile" && value.length !== 10) {
      return {
        validate: false,
        validateError: "Mobile number must be exactly ten digits",
      };
    }
  }

  return { validate: true, validateError: "" };
};
