import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import {sendOtp} from "../../../../http/index"
import {useDispatch} from "react-redux"
import {setOtp} from '../../../../store/authSlice'

const Phone = ({onNext}) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit(){
    //server request
    const {data} = await sendOtp({phone : phoneNumber});
    dispatch(setOtp({phone : data.phone, hash : data.hash}));
    console.log(data)
    onNext();
  }

  return (
    <Card title="Enter your phone number" icon="Phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setphoneNumber(e.target.value)}
        
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" logo="arrow_forward" onClick = {submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
