import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Builds from './pages/Builds'
import CurrentSet from './pages/CurrentSet'
import CrudTester from './pages/CrudTester'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center mt-6 mb-4">
        <h1 className="text-4xl font-bold mb-5 text-blue-600 tracking-wide">
          <span className="text-blue-800">TFT</span>ac<span className="text-blue-400">.tips</span>
        </h1>
        
        <nav className="w-full flex justify-center">
          <ul className="flex items-center gap-3">
          <li>
          <Link to="/crudtester" className="bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-purple-700 font-bold">
                Testing
              </Link>
            </li>
      
            <li>
              <Link to="/" className="bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-purple-700 font-bold">
                Home
              </Link>
            </li>
            <li className="text-gray-300">•</li>
            <li>
              <Link to="/builds" className="bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-purple-700 font-bold">
                Builds
              </Link>
            </li>
            <li className="text-gray-300">•</li>
            <li>
              <Link to="/currentset" className="bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-purple-700 font-bold">
                Set 14
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes> 
        <Route path="/crudtester" element={<CrudTester/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/builds" element={<Builds />} />
        <Route path="/currentset" element={<CurrentSet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App