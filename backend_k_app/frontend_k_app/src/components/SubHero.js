import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function SubHero({ word }) {
  // console.log(word);

  const { wordID, language } = useParams()

  return (
    <Container>

        <Row className='justify-content-center mt-5'>
          <Col xs={6}>
            {/* <Button className='w-100'>Play</Button> */}
            <Button as={ Link } to='/random' className='w-100'>Play</Button>
            {/* <Button as={ Link } to={`/${ word.id }`} className='w-100'>Play</Button> */}
          </Col>

          {/* <Col xs={5}>
            <Button className='w-100'></Button>
          </Col> */}

        </Row>

    </Container>
  )
}

export default SubHero