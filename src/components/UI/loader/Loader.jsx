import React from 'react'
import classes from './Loader.module.css'
import loaderGIF from '../../../img/loader.gif' 

const Loader = () => {
   return (
      <div className={classes.loader}>
         <img src={loaderGIF} alt="loader" width={"100px"} />
      </div>
   )
}

export default Loader