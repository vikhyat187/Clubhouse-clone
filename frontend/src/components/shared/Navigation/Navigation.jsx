import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../http'
import styles from './Navigation.module.css'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { useSelector } from 'react-redux'

const Navigation = ()=> {
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth)
    const brandStyle={
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:22,
        display:'flex',
        alignItems:'center'
    }
    const LogoText={
        marginLeft:10,
    }

    async function logoutUser(){
        //logout req
        try{
            
            const {data} = await logout();
            dispatch(setAuth(data))
        }catch(err){
            console.log(err)
        }
    }
    return (
      <div>
        <nav className={`${styles.navbar} container`}>
          <Link to="/" style={brandStyle}>
            <img src="/images/Logo.svg" alt="logo" />
            <span style={LogoText}>CodersHouse</span>
          </Link>
          {isAuth && <button onClick={logoutUser}>Logout user</button>}
        </nav>
      </div>
    );
}

export default Navigation