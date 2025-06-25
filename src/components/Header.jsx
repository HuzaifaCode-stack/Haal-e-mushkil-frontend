
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm d-block sticky-top border-3 border-bottom">
      <div className="container">
        <a className="navbar-brand fw-bold text-dark" href="#">KHUSHAAL KASHEER</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav ms-auto d-flex flex-column flex-lg-row">
            <Link className="nav-link text-dark px-3" to={'/'}>Home</Link>
            <Link className="nav-link text-dark px-3" to={'/feedback'}>Feedback</Link>
            <Link className="nav-link text-dark px-3" to={'/volunteer'}>Volunteer</Link>
            <Link className="nav-link text-dark px-3" to={'/voting'}>Voting</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
