const LASTFM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY || 'YOUR_API_KEY';
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0';

export interface LastFmImage {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}

export interface LastFmArtist {
  name: string;
  mbid: string;
  url: string;
  image: LastFmImage[];
  listeners?: string;
  playcount?: string;
}

export interface LastFmTrack {
  name: string;
  artist: {
    name: string;
    mbid: string;
  };
  url: string;
  image: LastFmImage[];
  listeners?: string;
  playcount?: string;
}

const makeApiCall = async (params: Record<string, string>) => {
  const searchParams = new URLSearchParams({
    ...params,
    api_key: LASTFM_API_KEY,
    format: 'json'
  });

  const response = await fetch(`${LASTFM_BASE_URL}?${searchParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data from Last.fm');
  }
  
  return await response.json();
};

export const searchArtists = async (query: string): Promise<LastFmArtist[]> => {
  try {
    const data = await makeApiCall({
      method: 'artist.search',
      artist: query,
      limit: '12'
    });
    
    return data.results?.artistmatches?.artist || [];
  } catch (error) {
    console.error('Error searching artists:', error);
    return [];
  }
};

export const searchTracks = async (query: string): Promise<LastFmTrack[]> => {
  try {
    const data = await makeApiCall({
      method: 'track.search',
      track: query,
      limit: '10'
    });
    
    return data.results?.trackmatches?.track || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

export const getTopArtists = async (): Promise<LastFmArtist[]> => {
  try {
    const data = await makeApiCall({
      method: 'chart.gettopartists',
      limit: '12'
    });
    
    return data.artists?.artist || [];
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
};

export const getTopTracks = async (): Promise<LastFmTrack[]> => {
  try {
    const data = await makeApiCall({
      method: 'chart.gettoptracks',
      limit: '10'
    });
    
    return data.tracks?.track || [];
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}; 