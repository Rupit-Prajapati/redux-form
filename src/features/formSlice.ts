import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { validateField } from "../helper.ts";

export interface Field {
  id: string;
  type: "text|'select";
  title: string;
  value: string;
  status: boolean;
  width: "half" | "full";
  validation: ("required" | "number")[];
  validate: boolean;
  validateError: string;
  options?: { text: string; value: string }[];
}

interface FormState {
  fields: Field[];
  button: {
    id: string;
    title: string;
    type: "submit" | "button";
    disabled: boolean;
  };
}

const USstate = [
  { text: "California", value: "cal" },
  { text: "Arkansas", value: "ark" },
];

const IndianState = [
  { text: "Gujarat", value: "guj" },
  { text: "Delhi", value: "del" },
];

const commonFormFields = {
  value: "",
  status: true,
  validate: true,
  validateError: "",
};

const commonTextField = {
  type: "text" as "text|'select",
  width: "half" as "half" | "full",
  ...commonFormFields,
};

const commonSelectField = {
  type: "select" as "text|'select",
  width: "half" as "half" | "full",
  ...commonFormFields,
};

const initialState: FormState = {
  fields: [
    {
      id: "firstname",
      title: "First Name",
      validation: ["required"],
      ...commonTextField,
    },
    {
      id: "lastname",
      title: "Last Name",
      validation: ["required"],
      ...commonTextField,
    },
    {
      id: "country",
      title: "Country",
      validation: ["required"],
      options: [
        { text: "India", value: "in" },
        { text: "United States", value: "us" },
      ],
      ...commonSelectField,
    },
    {
      id: "state",
      title: "State",
      validation: ["required"],
      options: [],
      ...commonSelectField,
    },
    {
      id: "zipcode",
      title: "Zipcode",
      validation: ["required", "number"],
      ...commonTextField,
    },
    {
      id: "mobile",
      title: "Mobile",
      validation: ["required", "number"],
      ...commonTextField,
    },
  ],
  button: {
    id: "submit",
    type: "submit",
    title: "Submit",
    disabled: true,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (!field) return;

      field.value = action.payload.value;

      if (field.id === "country") {
        const stateField = state.fields.find((f) => f.id === "state");
        if (stateField) {
          stateField.options =
            action.payload.value === "us"
              ? USstate
              : action.payload.value === "in"
              ? IndianState
              : [];

          const validationResult = validateField(stateField, "");
          stateField.validate = validationResult.validate;
          stateField.validateError = validationResult.validateError;
        }
      }

      const validationResult = validateField(field, action.payload.value);
      field.validate = validationResult.validate;
      field.validateError = validationResult.validateError;

      state.button.disabled = state.fields.some(
        (f) => f.status && (!f.value.trim() || !f.validate)
      );
    },

    updateError: (
      state,
      action: PayloadAction<{ id: string; isEmpty: boolean }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (!field) return;

      if (action.payload.isEmpty) {
        field.validate = false;
        field.validateError = "This field is required";
      } else {
        const validationResult = validateField(field, field.value);
        field.validate = validationResult.validate;
        field.validateError = validationResult.validateError;
      }

      state.button.disabled = state.fields.some(
        (f) => f.status && (!f.value.trim() || !f.validate)
      );
    },
  },
});

export const { updateField, updateError } = formSlice.actions;
export default formSlice.reducer;
