import React, { useEffect, useState } from 'react';
import { searchArtists, searchTracks, LastFmArtist, LastFmTrack } from '../services/lastfm';

interface SearchPageProps {
  searchQuery: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ searchQuery }) => {
  const [artists, setArtists] = useState<LastFmArtist[]>([]);
  const [tracks, setTracks] = useState<LastFmTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      setArtists([]);
      setTracks([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        const artistResults = await searchArtists(searchQuery);
        const trackResults = await searchTracks(searchQuery);
        setArtists(artistResults);
        setTracks(trackResults);
      } catch (err) {
        setError('Failed to load search results. Please try again later.');
      }

      setLoading(false);
    };

    search();
  }, [searchQuery]);

  const getArtistImage = (artist: LastFmArtist) => {
    for (const img of artist.image) {
      if (img.size === 'extralarge' && img['#text']) {
        return img['#text'];
      }
    }
    return '/placeholder-artist.png';
  };

  const getTrackImage = (track: LastFmTrack) => {
    for (const img of track.image) {
      if (img.size === 'large' && img['#text']) {
        return img['#text'];
      }
    }
    return '/placeholder-track.png';
  };

  if (loading) {
    return <div className="loading">Searching...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!searchQuery) {
    return <div className="no-results">Enter a search term to find music</div>;
  }

  if (artists.length === 0 && tracks.length === 0) {
    return <div className="no-results">No results found for "{searchQuery}"</div>;
  }

  return (
    <main className="main">
      {artists.length > 0 && (
        <section>
          <h2>Artists matching "{searchQuery}"</h2>
          <div className="artists__grid">
            {artists.map((artist, index) => (
              <div key={index} className="artist-card">
                <img
                  src={getArtistImage(artist)}
                  alt={artist.name}
                  className="artist-card__image"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-artist.png';
                  }}
                />
                <h3>{artist.name}</h3>
                <p>{parseInt(artist.listeners || '0').toLocaleString()} listeners</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tracks.length > 0 && (
        <section>
          <h2>Tracks matching "{searchQuery}"</h2>
          <div className="tracks__list">
            {tracks.map((track, index) => (
              <div key={index} className="track-item">
                <img
                  src={getTrackImage(track)}
                  alt={track.name}
                  className="track-item__image"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-track.png';
                  }}
                />
                <div className="track-item__info">
                  <h3>{track.name}</h3>
                  <p>{track.artist.name}</p>
                </div>
                <div className="track-item__listeners">
                  {parseInt(track.listeners || '0').toLocaleString()} listeners
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}; 