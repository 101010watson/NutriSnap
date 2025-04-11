import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import UploadImage from "./components/UploadImage"; 
import ResultPage from "./components/outputpage";

const App = () => { return ( <Router> <Routes> <Route path="/" element={<UploadImage />} /> <Route path="/result" element={<ResultPage />} /> </Routes> </Router> ); };

export default App;
