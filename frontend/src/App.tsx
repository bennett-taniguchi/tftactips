import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./NavMenu";
import Builds from "./pages/Builds";
import CrudTester from "./pages/CrudTester";
import CurrentSet from "./pages/CurrentSet";
import { PopulateData } from "./pages/PopulateData";
import TraitIcon from "./components/trait/TraitIcon";
import Home from "./components/home/Home";
 
 

const PageLayout = ({ children }: any) => (
  <div className="text-gray-100">{children}</div>
);
function App() {
  return (
    <BrowserRouter>
  
      <div className="  min-h-screen bg-gradient-to-b from-gray-950 to-blue-900">
     
        <NavMenu />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route
              path="/crudtester"
              element={
                <PageLayout>
                  <CrudTester />
                </PageLayout>
              }
            />
            <Route
              path="/populatedata"
              element={
                <PageLayout>
                  <PopulateData />
                </PageLayout>
              }
            />
          </Routes>
        </div>   
      </div>
    
    </BrowserRouter>
  );
}

export default App;
