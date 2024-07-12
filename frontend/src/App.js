import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"

function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
    </Routes>
  </>
  );
}

export default App;