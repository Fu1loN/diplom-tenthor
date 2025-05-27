import React, { useEffect, useState } from 'react';
import { getTopArtists, getTopTracks, LastFmArtist, LastFmTrack } from '../services/lastfm';

export const HomePage: React.FC = () => {
  const [topArtists, setTopArtists] = useState<LastFmArtist[]>([]);
  const [topTracks, setTopTracks] = useState<LastFmTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artists, tracks] = await Promise.all([
          getTopArtists(),
          getTopTracks()
        ]);
        setTopArtists(artists);
        setTopTracks(tracks);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const getArtistImage = (artist: LastFmArtist) => {
    const image = artist.image.find(img => img.size === 'extralarge');
    return image ? image['#text'] : '/placeholder-artist.png';
  };

  const getTrackImage = (track: LastFmTrack) => {
    const image = track.image.find(img => img.size === 'medium');
    return image ? image['#text'] : '/placeholder-track.png';
  };

  return (
    <main className="main">
      <section>
        <h2 className="section__title">Top Artists</h2>
        <div className="artists__grid">
          {topArtists.map((artist) => (
            <div key={artist.mbid || artist.name} className="artist-card">
              <img
                src={getArtistImage(artist)}
                alt={artist.name}
                className="artist-card__image"
              />
              <h3 className="artist-card__name">{artist.name}</h3>
              <p className="artist-card__listeners">
                {parseInt(artist.listeners || '0', 10).toLocaleString()} listeners
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section__title">Top Tracks</h2>
        <div className="tracks__list">
          {topTracks.map((track) => (
            <div key={`${track.artist.mbid}-${track.name}`} className="track-item">
              <img
                src={getTrackImage(track)}
                alt={`${track.name} by ${track.artist.name}`}
                className="track-item__image"
              />
              <div className="track-item__info">
                <h3 className="track-item__title">{track.name}</h3>
                <p className="track-item__artist">{track.artist.name}</p>
              </div>
              <div className="track-item__listeners">
                {parseInt(track.listeners || '0', 10).toLocaleString()} listeners
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}; 