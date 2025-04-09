import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./NavMenu";
 
 
import CurrentSet from "./pages/CurrentSet";
 

import Home from "./pages/Home";

import { GlobalProvider } from "./components/context/context";
import { Builds } from "./pages/Builds";
import Champions from "./pages/Champions";
import SingleChampion from "./pages/SingleChampion";
import Traits from "./pages/Traits";
import Items from "./pages/Items";

const PageLayout = ({ children }: any) => (
  <div className="text-gray-100">{children}</div>
);

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="  min-h-screen bg-gradient-to-b from-gray-950 to-blue-900">
          <NavMenu />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/champions/*" element={<SingleChampion />} />
              <Route path="/traits" element={<Traits />} />
              <Route path="/items" element={<Items />} />
              <Route
                path="/builds"
                element={
                  <PageLayout>
                    <Builds />
                  </PageLayout>
                }
              />
              <Route
                path="/currentset"
                element={
                  <PageLayout>
                    <CurrentSet />
                  </PageLayout>
                }
              />
           
            </Routes>
          </div>
        </div>
      </BrowserRouter>{" "}
    </GlobalProvider>
  );
}

export default App;
