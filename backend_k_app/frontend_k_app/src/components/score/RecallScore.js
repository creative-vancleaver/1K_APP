import React, { useState, useEffect } from 'react'

const RecallScore = ({ value, color, isCorrect }) => {

  const [animate, setAnimate] = useState(false);
  // const array = Array.from({ length: value }, (_, index) => index + 1);
  // const [starsArray, setStarsArray] = useState(array);
  const [starsArray, setStarsArray] = useState(Array.from({ length: value }, (_, index) => index + 1));
  const [animatedStarIndex, setAnimatedStarIndex] = useState(null);

  // useEffect(() => {
  //   setAnimate(false);
  //   setStarsArray(array);
  // }, []);

  useEffect(() => {
    // console.log('value change!! stars array change!!');
    setStarsArray(Array.from({ length: value }, (_, index) => index + 1));
  }, [value]);

  useEffect(() => {
    if (isCorrect) {
      // console.log('CORECT');
      const currentAnimatedIndex = value - 1;
      setAnimatedStarIndex(currentAnimatedIndex);
      setAnimate(true);
      // setTimeout(() => setAnimate(false), 500);
      setTimeout(() => {
        setStarsArray(currentStars => currentStars.filter((_, i) => i !== currentAnimatedIndex ));
        setAnimate(false);
      }, 500);
    }
  }, [isCorrect, value]);

  return (

    <div className='' style={{ marginBottom: '4rem' }}>
      {/* score */}

      {/* {text} */}
      {/* <div style={{ width: '100%', height: '0', paddingBottom: '134%', position: 'relative' }}><iframe src="https://giphy.com/embed/hl6DoTVyUUpqg" width="100%" height="100%" style={{ position: 'absolute', frameBorder: '0' }} className="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/dragonbox-animation-hl6DoTVyUUpqg">via GIPHY</a></p> */}

      { starsArray.map((star, index) => (
        <span key={ index }>
          <i style={{ color }} className={ `fas fa-star ${ index === animatedStarIndex && animate ? 'animated-star' : '' }`}></i>
        </span>
      ))}

      {/* <span> */}
        {/* <i style={{color}} className={
          value >= '1' ? 'fas fa-star' :
            'far fa-star'
        }></i> */}
        {/* <i style={{ color }} className={ `${ value >= 1 ? 'fas': 'far' } fa-star ${ animate && 'animated-star '}`} />
        
      </span>

      <span>
        <i style={{color}} className={
          value >= 2 ? 'fas fa-star' :
            'far fa-star'
        }></i>
      </span> */}

      {/* <span>
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
      </span> */}

    </div>

  )
}

export default RecallScore