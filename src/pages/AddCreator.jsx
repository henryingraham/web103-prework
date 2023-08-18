import { useState, useEffect } from "react";
import { supabase } from '../client'

export default function AddCreator() {
  const [creator, setCreator] = useState( {name: "", youtube: "", twitter: "", instagram: "", description: "", imageURL: ""} )

  const scroll = () => {
    const height = window.innerHeight
    window.scrollTo(0, height)
  }
  useEffect(() => {
    setTimeout(scroll, 400);
  }, [])
  const handleChange = (event) => {
      const {name, value} = event.target;
      setCreator( (prev) => {
          return {
              ...prev,
              [name]:value,
          }
      })
  }

  const addCreator = async (event) => {
    event.preventDefault()

    const { error } = await supabase
      .from('creators')
      .insert( {name: creator.name,
        youtube: creator.youtube,
        twitter: creator.twitter,
        instagram: creator.instagram,
        description: creator.description,
        imageURL: creator.imageURL} )

      if (error) {
          console.log(error)
      }

      window.location = "/Show"

  }


  return (
    <main className="add-page">
      <h1><span>Add Your Favorite Creators</span></h1>
      <form className="addCreatorForm">
                <label className="field">Name</label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

                <label className="field" >
                    Image
                    <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                </label>
                <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} required />

                <label className="field" >
                    Description
                    <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
                </label>
                <textarea name="description" rows="3" cols="50" id="description" value={creator.description} onChange={handleChange} required></textarea>

                <h3><span>Social Media Links</span></h3>
                <p>Provide at least one of the creator&apos;s social media links.</p>

                <label className="field" >
                    <span className="fa-brands fa-youtube"></span> YouTube
                    <p>The creator&apos;s YouTube handle (without the @)</p>
                </label>
                <input type="text" id="youtube" name="youtube" value ={creator.url} onChange={handleChange} />

                <label className="field" >
                    <span className="fa-brands fa-twitter"></span> Twitter
                    <p>The creator&apos;s Twitter handle (without the @)</p>
                </label>
                <input type="text" id="twitter" name="twitter" value ={creator.twitter} onChange={handleChange} />

                <label className="field" >
                    <span className="fa-brands fa-instagram"></span> Instagram
                    <p>The creator&apos;s Instagram handle (without the @)</p>
                </label>
                <input type="text" id="instagram" name="instagram" value ={creator.instagram} onChange={handleChange} />

                <button type="submit" onClick={addCreator}>Submit</button>
            </form>
    </main>
  )
}
