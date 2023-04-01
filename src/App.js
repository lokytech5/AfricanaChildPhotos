import { ChakraProvider } from "@chakra-ui/react";

import NavigationMenu from "./components/shared/NavigationMenu";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AboutUsPage from "./pages/AboutUsPage";
import LoginUserPage from "./pages/LoginUserPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./private/ProtectedRoute";
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
            <Route path='/profile' element={<ProfilePage />} />

            <Route path="/admin" element={<ProtectedRoute roles={['admin']} />}>
              <Route index element={<AdminPage />} />
            </Route>

          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
