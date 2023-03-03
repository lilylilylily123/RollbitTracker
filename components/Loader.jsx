import React from 'react'
import styles from '@/styles/Loader.module.scss'

const Loader = (props) => {

  if (props.loading) return <span className={styles.loader}></span>;
}

export default Loader
