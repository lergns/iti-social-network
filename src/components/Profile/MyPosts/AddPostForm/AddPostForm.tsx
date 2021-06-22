import {
  maxLength100,
  requiredField,
} from "../../../../utils/validators/validators";
import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormControls/FormControls";

export type AddPostFormDataType = {
  newPostText: string;
};

const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormDataType>
> = React.memo((props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          placeholder={"Post text"}
          name={"newPostText"}
          validate={[requiredField, maxLength100]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
});

export default reduxForm<AddPostFormDataType>({
  form: "profileAddPostForm",
})(AddPostForm);
