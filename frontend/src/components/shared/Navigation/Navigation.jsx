import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = ()=> {
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

    return (
        <div>
            <nav className={`${styles.navbar} container`}>
            <Link to="/" style={brandStyle}>
                <img src="/images/Logo.svg" alt="logo" />
                <span style={LogoText}>CodersHouse</span>
            </Link>
           </nav>
        </div>
    )
}

export default Navigation