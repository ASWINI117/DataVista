import { Link } from 'react-router-dom'
import logo from '../assets/datavista-logo.jpeg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* DataVista Logo + Brand */}
        <Link to="/" className="brand">
          <img
            src={logo}
            alt="DataVista Logo"
            className="brand-logo"
          />

          <div className="brand-text">
            <span className="brand-name">
              Data<span>Vista</span>
            </span>

            <span className="brand-tagline">
              See Your Data. Make Better Decisions.
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/free-notes">Free Notes</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* CTA Button */}
        <Link to="/free-notes" className="nav-button">
          Start Learning
        </Link>

      </div>
    </nav>
  )
}

export default Navbar