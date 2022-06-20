import React from 'react'
import styles from '../styles/Home.module.css'

export default function NavBar({ children }) {
  return (
    <div>
      <div className={styles.navbar}>MarcoPalini</div>
      {children}
    </div>
  )
}
