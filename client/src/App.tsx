import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Page404 from "./views/Page404";
import Home from "./views/Home";
import { Login } from "./views/Login";
import { ThemeProvider } from "styled-components";
import theme from "./colors/color";
import Register from "./views/Register";
import Admin from "./views/Admin";
import YourEvent from "./views/YourEvent";
import { YourDatePackageSelected } from "./views/YourDatePackageSelected";
import About from "./views/About";
import Gallery from "./views/Gallery";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Page404 />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/your-event" element={<YourEvent />} />
              <Route
                path="/your-date-package-selected"
                element={<YourDatePackageSelected />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
