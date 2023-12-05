import { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar';
import Assignment1 from './pages/Assignment1';
import Assignment2 from './pages/Assignment2';
import Home from "./pages/Home"

const loading = (
	<div className="pt-3 text-center">
	  <div className="sk-spinner sk-spinner-pulse"></div>
	</div>
  )

function App() {
  return (
	<BrowserRouter>
	<Suspense fallback={loading}>
		<Appbar/>
	  <Routes>
		<Route exact path="/" name="home" element={<Home />} />
		<Route exact path="/assignment-1" name="Assignment_1" element={<Assignment1 />} />
		<Route exact path="/assignment-2" name="Assignment_2" element={<Assignment2 />} />
		<Route path="*" name="Error404" element={<div>404</div>} />
	  </Routes>
	</Suspense>
  </BrowserRouter>
  );
}

export default App;
