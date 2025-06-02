import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import ProtectedTestData from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import Weather from "./components/Weather/Weather";
import CountriesList from "./components/Countries/CountriesList";
import CountryDetail from "./components/Countries/CountryDetail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route
                path="/login"
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                }
              />
              <Route path="/weather" element={<Weather />} />
              <Route path="/countries" element={<CountriesList />} />
              <Route path="/countries/:name" element={<CountryDetail />} />

              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<CountriesList />} />
              {/* Other routes... */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
