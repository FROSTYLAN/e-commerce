import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, Products, Purchases } from './pages';
import { Loading } from './components';
import './App.css';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>

        { isLoading ?  <Loading /> : null }

        <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/products/:id' element={<Products />}/>
          <Route path='/purchases' element={<Purchases />}/>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
