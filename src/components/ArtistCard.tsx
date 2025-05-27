import React from 'react';
import { LastFmArtist } from '../services/lastfm';

interface ArtistCardProps {
  artist: LastFmArtist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const getImage = () => {
    // Try to get the largest image
    for (const img of artist.image) {
      if (img.size === 'extralarge' && img['#text']) {
        return img['#text'];
      }
    }
    // If no image found, use a placeholder
    return '/placeholder-artist.png';
  };

  return (
    <div className="artist-card">
      <img
        src={getImage()}
        alt={artist.name}
        onError={(e) => {
          e.currentTarget.src = '/placeholder-artist.png';
        }}
      />
      <h3>{artist.name}</h3>
      <p>{parseInt(artist.listeners || '0').toLocaleString()} listeners</p>
    </div>
  );
}; 