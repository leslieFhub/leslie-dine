import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [brgy, setbrgy] = useState(shippingAddress.brgy);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, brgy, postalCode }));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
      <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
        <h6>DELIVERY ADDRESS</h6>
          
        <div className="form-group">
            <label htmlFor="city"></label>
            <select
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              <option value="Bacoor">Bacoor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="brgy"></label>
            <select
              className="form-control"
              id="brgy"
              value={brgy}
              onChange={(e) => setbrgy(e.target.value)}
              required
            >
              <option value="">Select Baranggay</option>
              <option value="Molino I">Molino I</option>
              <option value="Alima">Alima</option>
              <option value="Aniban I">Aniban I</option>
              <option value="Aniban II">Aniban II</option>
              <option value="Aniban III">Aniban III</option>
              <option value="Aniban IV">Aniban IV</option>
              <option value="Aniban V">Aniban V</option>
              <option value="Banalo">Banalo</option>
              <option value="Camposanto">Camposanto</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Enter Street"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>

      </div>
    </>
  );
};

export default ShippingScreen;
