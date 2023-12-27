import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import { isCurrentPassword, isValue } from "@/utils/vaildate";
import styles from "./SettingPassword.module.css";
import {
  mypageCurrentPassword,
  mypageNewPasswordCheck,
  signupPassword,
  signupPasswordCheck,
} from "@/constants/inputConfig";
import { mypageNewPassword } from "./../../../constants/inputConfig";
import Button from "@/components/buttons/Button/Button";

const SettingPassword = () => {
  const currentPassword = "codeit101!";
  const { wrapper: currentWrapper, input: currentInput } = useInputController(
    Object.assign(mypageCurrentPassword, {
      errorConfig: [[isCurrentPassword(currentPassword)], [isValue]],
    })
  );
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(mypageNewPassword);
  const { wrapper: passwordCheckWrapper, input: passwordCheckInput } = useInputController(mypageNewPasswordCheck);

  const inputs: Array<[typeof currentWrapper, typeof currentInput]> = [
    [currentWrapper, currentInput],
    [passwordWrapper, passwordInput],
    [passwordCheckWrapper, passwordCheckInput],
  ];

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      {inputs.map(([wrapper, input], index) => {
        return (
          <InputWrapper {...wrapper} key={index}>
            <Input {...input} />
          </InputWrapper>
        );
      })}
      <div className={styles.savebutton}>
        <Button buttonType="accept_reject" color="violet">
          변경
        </Button>
      </div>
    </article>
  );
};

export default SettingPassword;
