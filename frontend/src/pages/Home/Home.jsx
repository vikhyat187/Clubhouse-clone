import React from 'react'
import styles from './Home.module.css'
import { Link,useHistory } from 'react-router-dom'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'


const Home = () => {
    const signInLinkStyle={
        color:'#0077FF',
        fontWeight:'bold',
        textDecoration:'none',
        marginLeft:'10px',
    };

  
    const history = useHistory();
    function StartRegister(){
        history.push('/authenticate');
    }
    return (
        <div className={styles.cardWrappper}>
            <Card title="Welcome to Coders House!" icon="logo">
                <p className={styles.text}>We’re working hard to get Codershouse
                ready for everyone! While we wrap up the 
                finishing youches, we’re adding people 
                gradually to make sure nothing breaks
                </p>
                <div>
                    <Button onClick={StartRegister} logo="arrow_forward" text="Let's Go">

                    </Button>
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>Havke an invite text?</span>
                </div>
            </Card>
        </div>
    );
};

export default Home