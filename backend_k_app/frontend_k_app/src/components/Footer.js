import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import DebugForm from './forms/DebugForm';

function Footer() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [showDebugModal, setShowDebugModal] = useState(false);

  return (

    <footer>

      { userInfo && (
        <DebugForm show={ showDebugModal } handleClose={ () => setShowDebugModal(false) } />
      )}

      <Container>
        <Row className='d-flex align-items-center'>
          <Col className='text-center py-3 copyright' xs={{ span: 6, offset: 3 }}>
            Copyright &copy; JVC
          </Col>
          <Col xs={ 3 } className='text-end'>
            { userInfo && (
              <i className='fa-solid fa-bug bug-btn' onClick={ () => setShowDebugModal(true) } />
            )}
          </Col>
        </Row>
        
      </Container>


    </footer>

  )
}

export default Footer