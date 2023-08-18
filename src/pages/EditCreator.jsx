import { useEffect, useState } from "react";
import { supabase } from '../client'
import { useParams } from 'react-router-dom';

export default function EditCreator() {
  const { creatorId } = useParams()

  const [creator, setCreator] = useState({
    name: '',
    imageURL: '',
    description: '',
    youtube: '',
    twitter: '',
    instagram: '',
  });

  useEffect(() => {
    // Fetch the creator's data based on creatorId
    async function fetchCreatorData() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('name', creatorId)
          .single();

        if (error) {
          console.error('Error fetching creator data:', error.message);
          console.log('error')
        } else {
          setCreator(data);
        }
      } catch (exception) {
        console.error('An exception occurred:', exception);
      }
    }

    fetchCreatorData();
  }, [creatorId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,
    }));
  };

  const updateCreator = async (event) => {
    event.preventDefault()

    const { error } = await supabase
      .from('creators')
      .update( {name: creator.name,
        youtube: creator.youtube,
        twitter: creator.twitter,
        instagram: creator.instagram,
        description: creator.description,
        imageURL: creator.imageURL} )
        .eq('name', creatorId)

      if (error) {
        console.log(error)
      }

      window.location = "/Show"

  }


  return (
    <main className="add-page">
      <h1><span>Edit Creator</span></h1>
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
                <input type="text" id="youtube" name="youtube" value ={creator.youtube} onChange={handleChange} />

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

                <button type="submit" onClick={updateCreator}>Submit</button>
            </form>
    </main>
  )
}
