import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand " to='/'>
          Firebase
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to='/view'>
                View
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/query'>
                QueryView
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/add'>
                add
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/delete'>
                delete
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/update'>
                update
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/upload'>
                upload
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/uploadhook'>
                uploadhook
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/uploadfetch'>
                uploadFetch
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/uploaddelete'>
                uploadDelete
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to='/unsubscribe'>
              UnSubscribeSnapshot
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
