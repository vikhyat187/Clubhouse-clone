import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../http'
import styles from './Navigation.module.css'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { useSelector } from 'react-redux'

const Navigation = ()=> {
    const dispatch = useDispatch();
    const {user,isAuth} = useSelector(state => state.auth)
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
          {isAuth && (
            <div className={styles.navRight}>
              <h1>{user.name}</h1>
              <Link to="/">
                <img
                  className={styles.avatar}
                  src={user.avatar}
                  width="40"
                  height="40"
                  alt="avatar"
                />
              </Link>
              <button className={styles.logoutButton} onClick={logoutUser}>
                <img src="/images/logout.png" alt="Logout" />
              </button>
            </div>
          )}
          {/* {isAuth && } */}
        </nav>
      </div>
    );
}

export default Navigation