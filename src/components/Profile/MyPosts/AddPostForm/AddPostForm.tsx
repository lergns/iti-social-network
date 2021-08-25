import {
  maxLength100,
  requiredField,
} from "../../../../utils/validators/validators";
import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormControls/FormControls";
import classes from "./AddPostForm.module.css";

export type AddPostFormDataType = {
  newPostText: string;
};

const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormDataType>
> = React.memo(({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={Textarea}
          placeholder={"Post text"}
          name={"newPostText"}
          validate={[requiredField, maxLength100]}
        />
      </div>
      <div>
        <button className={classes.btn}>Add post</button>
      </div>
    </form>
  );
});

export default reduxForm<AddPostFormDataType>({
  form: "profileAddPostForm",
})(AddPostForm);
