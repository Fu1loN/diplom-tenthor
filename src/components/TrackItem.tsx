import React from 'react';
import { LastFmTrack } from '../services/lastfm';

interface TrackItemProps {
  track: LastFmTrack;
}

export const TrackItem = ({ track }: TrackItemProps) => {
  const getImage = () => {
    // Try to get the largest image
    for (const img of track.image) {
      if (img.size === 'large' && img['#text']) {
        return img['#text'];
      }
    }
    // If no image found, use a placeholder
    return '/placeholder-track.png';
  };

  return (
    <div className="track-item">
      <img
        src={getImage()}
        alt={track.name}
        onError={(e) => {
          e.currentTarget.src = '/placeholder-track.png';
        }}
      />
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist.name}</p>
      </div>
      <div className="track-listeners">
        {parseInt(track.listeners || '0').toLocaleString()} listeners
      </div>
    </div>
  );
}; 