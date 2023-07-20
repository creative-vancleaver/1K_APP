import React from 'react'

function Score({ value, color, text }) {
  return (

    <div className='score'>

      {/* {text} */}

      <span>
        <i style={{color}} className={
          value >= '1' ? 'fas fa-star' :
            'far fa-star'
        }></i>
        
      </span>

      <span>
        <i style={{color}} className={
          value >= 2 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 3 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 4 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 5 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 6 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 7 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 8 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 9 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

      <span>
        <i style={{color}} className={
          value >= 10 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span>

    </div>

  )
}

export default Score