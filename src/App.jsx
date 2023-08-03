import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Regions from './components/Regions';
import Cities from './components/Cities';
import Details from './components/Details';

function App() {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Regions />} />
        <Route path="/details/:name/" element={<Cities />} />
        <Route path="/details/:region/:city" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
