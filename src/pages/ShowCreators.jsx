import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import InfoIcon from '@mui/icons-material/Info';

export default function ShowCreators() {
  const [creators, setCreators] = useState([])

  const scroll = () => {
    const height = window.innerHeight
    window.scrollTo(0, height)
  }

  useEffect(() => {
    
    const fetchCreators = async () => {
      const {data} = await supabase
      .from('creators')
      .select()

      setCreators(data)
    }

    fetchCreators()
    setTimeout(scroll,500);
  }, [])


  return (
    <div className='show' >
        <h1 style={{margin: '0', padding: '40px'}}><span>Your Favorite Creators</span></h1>
        <div className='creator-section'>
          { creators && creators.length > 0 ?
            creators.map((creator) => (
            <Link className='card' to={`/${creator.name}`} state={creator} key={creator.name} style={{backgroundImage: `url(${creator.imageURL})`}}>
              <div className='card-content' >
                <h2>{creator.name}</h2>
                <div>
                  <InfoIcon />
                </div>
              </div>
            </Link>
          )) : <h3>{'No Creators Yet 😞'}</h3>}
        </div>
        <Outlet />
    </div>
  )
}
