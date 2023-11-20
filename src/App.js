import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home,Stack,Token, Navbar } from "./utils/baseComponents";


function App() {
  return (
    <div className="App">
      <Navbar />

        <Routes>
          <Route path="/" exact  element={<Home />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/buy-token" element={<Token />} />

        </Routes>

    </div>
  );
}

export default App;
