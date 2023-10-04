import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { createBrowswerHistory } from 'history'
import { Container } from 'react-bootstrap';

// SCREENS
import HomeScreen from './screens/HomeScreen';
import WordScreen from './screens/WordScreen';
import LanguageScreen from './screens/LanguageScreen';
import UserListScreen from './screens/UserListScreen';
import NotFound from './screens/NotFound';

import Header from './components/Header';
import Footer from './components/Footer';
import LanguageForm from './components/forms/LanguageForm';

import UserLoginScreen from './screens/UserLoginScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AdminScreen from './screens/AdminScreen';
import UserUpdate from './components/admin/UserUpdate';

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
            <Route path='/languages/:language/' element={ <LanguageScreen /> } />
            <Route path='/languages/:language/random/' element={ <WordScreen /> } />

            <Route path='/login/' element={ <UserLoginScreen /> } />
            <Route path='/register/' element={ <UserRegisterScreen /> } />
            <Route path='/profile/' element={ <UserProfileScreen /> } />

            <Route path='/profile/admin/' element={ <AdminScreen /> } />
            <Route path='/profile/admin/user/:id/edit' element={ <UserUpdate /> } />

            <Route path='/languageform/' element={ <LanguageForm /> } />

            {/* 404 PAGE */}
            <Route path='*' element={ <NotFound /> } />

            {/* <Route path='/users/' element={ <UserListScreen /> } /> */}

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
