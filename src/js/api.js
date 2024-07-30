import axios from 'axios';

const PER_PAGE = 40;
let totalPages = 0;

async function getGallery(query, page) {
  try {
    const API_KEY = '37395958-127fcb09f2bdd431f83628871';
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page: page,
    });

    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    totalPages = Math.ceil(response.data.totalHits / PER_PAGE);
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
}

export { getGallery, totalPages };
