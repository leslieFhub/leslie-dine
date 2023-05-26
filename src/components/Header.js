import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
              <Link to="/" style={{ color: "black" }}>
                <div className="d-flex align-items-center">
                  <span>Leslies Pizza </span>
                  <span style={{ color: "yellow" }}> Foodhub</span>
                </div>
              </Link>
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center">
              <Link to="/cart">
                <i className="fas fa-shopping-bag"></i>
                <span className="badge">{cartItems.length}</span>
              </Link>
              <button className="btn btn-link" onClick={handleRefreshClick}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
