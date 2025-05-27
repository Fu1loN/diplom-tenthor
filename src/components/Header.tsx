import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate('/search');
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <Link to="/" style={{ color: 'var(--primary-red)', textDecoration: 'none' }}>
              Last.fm
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>
              <li className="nav__item">
                <Link to="/live" className="nav__link">Live</Link>
              </li>
              <li className="nav__item">
                <Link to="/music" className="nav__link">Music</Link>
              </li>
              <li className="nav__item">
                <Link to="/charts" className="nav__link">Charts</Link>
              </li>
              <li className="nav__item">
                <Link to="/events" className="nav__link">Events</Link>
              </li>
              <li className="nav__item">
                <Link to="/features" className="nav__link">Features</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__right">
          <form className="header__search" onSubmit={handleSearch}>
            <input
              type="text"
              className="search__input"
              placeholder="Search for music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search__button">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
          <Link to="/profile" className="header__profile">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}; 