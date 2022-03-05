import React,{useState} from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';


const phoneEmailMap = {
    phone: Phone,
    email: Email,
};

const StepPhoneEmail = ({onNext}) => {
    const [type,setType]=useState('email');
    const Component = phoneEmailMap[type];
    
    function onNext(){
    }

    return (
        <Component onNext={onNext} />
    );
}

export default StepPhoneEmail
