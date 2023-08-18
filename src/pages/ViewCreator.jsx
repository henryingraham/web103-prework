import { Link, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '../client'
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function ViewCreator() {
  let location = useLocation();
  const creator = location.state

  const deleteCreator = async (event) => {
    event.preventDefault()

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('name', creator.name)

      if (error) {
          console.log(error)
      }

      window.location = "/Show"

  }

  return (
    <main>
      {/* <h2><span>View Creator</span></h2> */}
      <div className='creator-section'>
        <div className='creator-info'>
        <h1><span>{creator ? creator.name : 'Loading...'}</span></h1>
          <div className='creator-profile'>
            <img src={`${creator.imageURL}`} alt={creator.name}></img>
            <div className='creator-description'>
              <p>
                {creator.description}
              </p>
              <a className='social-link' href={`https://www.youtube.com/@${creator.youtube}`} target='blank'>
                <YouTubeIcon />
                {creator.youtube}
              </a>
              <a className='social-link'href={`https://www.twitter.com/${creator.twitter}`} target='blank'>
                <TwitterIcon />
                {creator.twitter}
              </a>
              <a className='social-link'href={`https://www.instagram.com/${creator.instagram}`} target='blank'>
                <InstagramIcon />
                {creator.instagram}
              </a>
              
            </div>
          </div>
          <div className='creator-buttons'>
            <Link className='button2 btn2' to={`/Edit/${creator.name}`} >
              <h3>Edit</h3>
            </Link>
            <Link className='btn2' onClick={deleteCreator}>
              <h3>Delete</h3>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </main>
  )
}
