import React from 'react'
import styles from '/styles/Loader.module.scss'

const Loader = (props) => {

  return (
      <div className={styles.parent}>
        <span className={styles.loader}></span>
      </div>
  );
}

export default Loader
