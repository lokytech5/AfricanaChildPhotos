import { ChakraProvider } from "@chakra-ui/react";

import NavigationMenu from "./components/shared/NavigationMenu";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AboutUsPage from "./pages/AboutUsPage";
import LoginUserPage from "./pages/LoginUserPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <NavigationMenu />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/login' element={<LoginUserPage />} />
            <Route path='/register' element={<RegisterUserPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
