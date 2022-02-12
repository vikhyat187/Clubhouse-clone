import React from 'react'
import styles from './Button.module.css'
const Button=({logo,text,onClick})=>{
    return (
        <button onClick={onClick} className={styles.button}>
        <span> {text}</span>
        <img src={`/images/${logo}.svg`} alt="arrow forward" className={styles.arrow}/>     
        </button>
    )
}
export default Button