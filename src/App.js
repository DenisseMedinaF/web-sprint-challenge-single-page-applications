import { Home } from "./components/Home";
import { Pizza } from "./components/Pizza";
import { Route, Routes, useNavigate } from "react-router-dom";



const App = () => {
  const navigate = useNavigate();
  return (
<>
      <h1>Lambda Eats</h1>
      <nav>
      <button id="pizza-form" onClick={() => navigate('/')}>Home</button>
        <button id="order-pizza" onClick={() => navigate('/pizza')}>Order Now</button>
        <button onClick={() => navigate('/pages/helpPage')}>Help</button>
      </nav>
    <Routes>
      <Route path= '/' element={<Home />}>Home</Route>
      <Route path='/pizza' element={<Pizza />}>Order Now</Route>
    </Routes>
  </>
  );
};

export default App;
