import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../common/FormControls/FormControls";
import {
  maxLength100,
  requiredField,
} from "../../../utils/validators/validators";

export type AddMessageFormDataType = {
  newMessageText: string;
};

const AddMessageForm: React.FC<
  InjectedFormProps<AddMessageFormDataType>
> = React.memo(({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"newMessageText"}
          placeholder={"Message text"}
          validate={[requiredField, maxLength100]}
        />
      </div>
      <div>
        <button style={{ cursor: "pointer" }}>Send</button>
      </div>
    </form>
  );
});

export default reduxForm<AddMessageFormDataType>({
  form: "dialogueAddMessageForm",
})(AddMessageForm);
