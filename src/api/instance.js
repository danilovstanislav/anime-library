import axios from 'axios'

const instance = axios.create({
	baseURL: '/v2/',
	timeout: 10000,
	headers: {
		'X-MAL-CLIENT-ID': 'b5389660fb445fe919936bc9b7b809c2',
	},
})

export default instance
