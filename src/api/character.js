import axios from 'axios'

export const getCurrentCharacter = async (id) => {
  let loading = false
  let result = null

  try {
    loading = true
    const r = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
    result = r.data.data
  } catch (err) {
    console.error(err)
  } finally {
    loading = false
  }

  return {
    charImage: result.images.jpg.image_url,
    charName: result.name,
    charAbout: result.about,
    loading,
  }
}
