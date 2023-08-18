import { Outlet, Link } from 'react-router-dom';

import './App.css'

function App() {
  const scroll = () => {
    const height = window.innerHeight
    window.scrollTo(0, height)
  }
  return(
    <>
      <div className='landing'>
        <h1 style={{letterSpacing: '0.2em', fontWeight: '400'}}>CreatorVerse</h1>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
          <Link className='button' to="/Show" onClick={scroll}>
            <div>
              See all the Creators
            </div>
          </Link>
          <Link className='button' to="/Add" onClick={scroll}>
            <div>
              Add a Creator
            </div>
          </Link>
        </div>
      </div>
      
      <Outlet />
      <div className="copyright">
        <p>Copyright © 2023 Henry Ingraham, All Rights Reserved</p>
      </div>
    </>
  )
    
}

export default App
