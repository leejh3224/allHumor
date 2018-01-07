import React from 'react'
import styles from './ShareButton.sass'

const ShareButton = () => (
  <button onClick={e => e.preventDefault()} className={styles.wrapper}>
    <i className="ion-share" />
    <span className={styles.wrapperText}>공유</span>
  </button>
)

export default ShareButton
