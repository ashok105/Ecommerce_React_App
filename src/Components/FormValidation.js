import { object, string, number} from "yup";
//SignUp Form
let sigUpFormValidation = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).max(20).required(),
  confirmPassword: string()
    .min(8)
    .max(20)
    .required()
    .test("confirm-password", "Password Not Matched", function (value) {
      return value == this.parent.password;
    }),
});

//Login Form


export default sigUpFormValidation;