import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "../src/LoginPage.js";
import YourHome from "../src/YourHome.js";
import CreateProgram from "../src/CreateProgram.js";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Home" element={<YourHome />}/>
        <Route path="/Create" element={<CreateProgram />}/>
      </Routes>
    </Router>
  );
}

export default App;
