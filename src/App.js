import { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar';
import AssignmentA from './pages/AssignmentA';
import AssignmentB from './pages/AssignmentB';
import Home from "./pages/Home"
import AssignmentC from './pages/AssignmentC';

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
		<Route exact path="/assignment-a" name="Assignment_A" element={<AssignmentA />} />
		<Route exact path="/assignment-b" name="Assignment_B" element={<AssignmentB />} />
		<Route exact path="/assignment-c" name="Assignment_C" element={<AssignmentC />} />
		<Route path="*" name="Error404" element={<div>404</div>} />
	  </Routes>
	</Suspense>
  </BrowserRouter>
  );
}

export default App;
