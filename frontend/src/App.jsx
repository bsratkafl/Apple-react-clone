import "./assets/css/styles.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import { Routes, Route } from "react-router-dom";
import Iphone from "./pages/Iphone/Iphone";
import Ipad from "./pages/Ipad/Ipad";
import Mac from "./pages/Mac/Mac";
import SingleAppleProduct from "./pages/SingleAppleProduct/SingleAppleProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/iphone" element={<Iphone />} />
        {/* Dynamic routes for single products */}
        <Route path="/iphone/:id" element={<SingleAppleProduct />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/mac" element={<Mac />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
