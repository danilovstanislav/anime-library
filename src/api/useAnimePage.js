import instance from '@/api/instance'

const animePageFields = [
  'start_date',
  'end_date',
  'synopsis',
  'media_type',
  'genres',
  'num_episodes',
  'average_episode_duration',
  'recommendations',
  'statistics',
]

export async function useAnimePage(id) {
  let result = null
  let load = false
  let error = false

  try {
    load = true
    let response = await instance({
      method: 'GET',
      url: `anime/${id}`,
      params: {
        fields: {
          ...animePageFields,
        },
      },
    })
    result = response.data
  } catch (err) {
    error = true
    console.error(err)
  } finally {
    load = false
  }
  return { result, load, error }
}
