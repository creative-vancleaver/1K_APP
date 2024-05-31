import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CharacterCard = ({ character }) => {

    const [flip, setFlip] = useState(false);

    function handleClick() {
        setFlip(flip => !flip);
    };

  return (

    <div>

        <Card className={ `cards ${ flip ? "flip" : "" }` }>

            <div 
                className="front"
                onClick={ handleClick }
                onTouchEnd={ handleClick }
            >
                Character
            </div>

            <div
                className="back"
                onClick={ handleClick }
                onTouchEnd={ handleClick }
            >
                Pronunciation
            </div>


        </Card>

    </div>

  )
}

export default CharacterCard