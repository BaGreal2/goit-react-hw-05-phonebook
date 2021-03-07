import React from 'react';
import styles from './ErrorName.module.css';

const ErrorName = () =>{
   return( 
   <div className={styles.container}>
        <p className={styles.text}>Contact already exist</p>
    </div>
   )
}

export default ErrorName;