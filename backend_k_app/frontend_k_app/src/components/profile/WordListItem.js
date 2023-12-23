import React from 'react'

const WordListItem = React.memo(({ word, moveWord, index }) => {

  return (

    <p style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }}>

        { word.isMastered ? (


            <>
                <i className="fa-solid fa-arrow-left me-2 move-word-btn" onClick={ () => moveWord(word.id) } />

                <span>
                    { word.id } | { word.user_word } | { index }
                </span>
            </>

        ) : (

            <>
                <span>
                    {/* <i className="fa-regular fa-circle-xmark me-2" id={ word.id }></i> */}
                        { word.id } | { word.user_word } | { index }
                </span>
                {/* <button onClick={ () => moveWord(word.id)}> */}
                    <i onClick={ () => moveWord(word.id)} className="fa-solid fa-arrow-right move-word-btn"></i>
                {/* </button> */}
            </>
        )}
    </p>

  );
});

export default WordListItem