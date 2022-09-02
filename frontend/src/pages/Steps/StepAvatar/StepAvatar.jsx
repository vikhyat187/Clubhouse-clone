import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepAvatar.module.css";
import {activate} from "../../../http/index"
import { setAvatar } from "../../../store/activateSlice";
import {setAuth} from "../../../store/authSlice"

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const dispatch = useDispatch();

  async function submit() {
      try{
          const {data} = await activate({name, avatar});
          if(data.auth){
            //fully activated
            dispatch(setAuth(data ))
          }
          console.log(data);
      }
      catch(e){
        console.log(e)
      }
  }
  
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  return (
    <>
      <Card title={`Okay, ${name} !`} icon="monkey">
        <p className={styles.subHeading}> How's this photo</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            className={styles.avatarInput}
            type="file"
            id="avatarInput"
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose different photo.
          </label>
        </div>

        <div>
          <Button onClick={submit} text="Next" logo="arrow_forward" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
