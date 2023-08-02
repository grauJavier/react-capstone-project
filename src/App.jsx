import { Route, Routes } from 'react-router-dom';

import Regions from './components/Regions';
import Cities from './components/Cities';
import Details from './components/Details';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Regions />} />
        <Route path="/cities/:id" element={<Cities />} />
        <Route exact path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
