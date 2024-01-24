import React from 'react'

const CharacterListItem = React.memo(({ character, index }) => {
    
  return (

    <p style={{
        display: 'flex',
        justifyContent: 'space-beteween',
        alignItems: 'center',
        width: '100%'
    }}>

        { character.isMastered ? (

            <>
                <i className="fa-solid fa-arrow-left me-2">
                    <span>
                        { character.id } | { character.user_character } | { index }
                    </span>
                </i>
            </>

        ) : (
            <>
                <span>
                    { character.id } | { character.user_character } | { index }
                </span>

                <i className="fa-solid fa-arrow-right ms-2"></i>
            </>
        )
    
    }

    </p>

  )
});

export default CharacterListItem