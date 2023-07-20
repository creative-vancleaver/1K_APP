import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { createBrowswerHistory } from 'history'
import { Container } from 'react-bootstrap';

// SCREENS
import HomeScreen from './screens/HomeScreen';
import WordScreen from './screens/WordScreen';
import LanguageScreen from './screens/LanguageScreen';

import Header from './components/Header';
import Footer from './components/Footer';

// const history = createBrowswerHistory();

function App() {

  // const pathname = window.location.pathname.split('/');
  // console.log(pathname)

  return (
    <Router>
    {/* <div> */}
      <Header />
      <main className='py-3'>
        <Container>
          
          <Routes>
            <Route path='/' element={ <HomeScreen /> } exact />
            {/* <Route path='/word/wordlist/:id' element={ <WordScreen /> } /> */}
            <Route path='/:language/' element={ <LanguageScreen /> } />
            <Route path='/:language/random/' element={ <WordScreen /> } />

            {/* <Route path=':language/:id/' element={ <WordScreen /> } /> */}
            {/* <Route path='/random' element={ <WordScreen /> } /> */}
          </Routes>


        </Container>
      </main>
      <Footer />
      
    </Router>
    // </div>
  );
}

export default App;
