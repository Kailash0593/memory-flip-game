import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { PlayGame } from './pages/play-game/PlayGame.jsx';
import { PlayGround } from './pages/play-ground/PlayGround.jsx';

function App() {
  return (
    <>
      <div className='w-full bg-blue-300 flex flex-row justify-between'>
        <span className='align-middle p-2'>Flip Card Memory Game</span>
        <nav className='align-middle p-2'>
          <NavLink className={({ isActive }) =>
            `p-2 text-white ${isActive ? "underline underline-offset-4" : ""}`
          } to="/">Play Game</NavLink  >
          <NavLink className={({ isActive }) =>
            `p-2 text-white ${isActive ? "underline underline-offset-4" : ""}`
          } to="/play-ground">Play Ground</NavLink  >
        </nav>
      </div>
      <div className='center relative game-container'>
      <Routes>
        <Route path='/' element={<PlayGame />} />
        <Route path='/play-ground' element={<PlayGround />} />
      </Routes>
      </div>
    </>
  )
}

export default App
