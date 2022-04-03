import instance from '@/api/instance'

const rankFields = [
  'num_episodes',
  'alternative_titles',
  'media_type',
  'start_season',
]

export async function useRanking(type) {
  let result = null
  let load = false
  let error = false

  try {
    load = true
    let response = await instance({
      method: 'GET',
      url: `anime/ranking`,
      params: {
        limit: 30,
        ranking_type: type,
        fields: {
          ...rankFields,
        },
      },
    })
    result = [...response.data.data]
  } catch (err) {
    error = true
    console.error(err)
  } finally {
    load = false
  }
  return { result, load, error }
}
