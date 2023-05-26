import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.03 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate) || {
    order: null,
    success: false,
    error: null
  };
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success && order) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);
  
  
  cart.paymentMethod = "cashOnDelivery";
  
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };


  return (
    <>
      <Header />
      <div className="container">
        <div className="row order-detail d-flex justify-content-center align-items-center ">
                    
        <div className="row justify-content-center">
            <div className="col text-center">
              <img src="/images/paid.png" width={50} height={50} alt="" />
              <span>Order confirmation</span>
              <div className="checkedIcon blink-animation">
                <img src="/images/checked.png" width={20} height={20} alt="" />
              </div>
            </div>
            <div className="col text-center blur-effect">
              <img src="/images/bake.png" width={60} height={60} alt="" />
              <span className="blur-text">Preparing</span>
              <div className="checkedIcon">
                <img src="/images/checked.png" width={20} height={20} alt="" />
              </div>
            </div>

            <div className="col text-center blur-effect">
              <img src="/images/bike.png" width={50} height={50} alt="" />
              <span className="blur-text">On the way</span>
              <div className="checkedIcon">
                <img src="/images/checked.png" width={20} height={20} alt="" />
              </div>
            </div>

            <div className="col text-center blur-effect">
              <img src="/images/delivered.png" width={50} height={50} alt="" />
              <span className="blur-text">Delivered</span>
              <div className="checkedIcon">
                <img src="/images/checked.png" width={20} height={20} alt="" />
              </div>
            </div>

          </div>
        

      </div>


      <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>Php {item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>Php {cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>Php {cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>Php {cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>Php {cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                PLACE ORDER
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
