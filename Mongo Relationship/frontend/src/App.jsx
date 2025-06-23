import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layouts from './Layouts';
import Home from './pages/Home';
import Registation from './pages/Registation';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Registation />} />
          <Route path='/home' element={<Home />} />
          <Route path='/registation' element={<Registation />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
