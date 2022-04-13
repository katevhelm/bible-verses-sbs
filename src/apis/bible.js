import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.scripture.api.bible/v1/bibles',
  headers: {
    'api-key': 'b8dfb63d28dd56794a289f9402eec6c5',
  },
});
