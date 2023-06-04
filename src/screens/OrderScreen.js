import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import { URL } from "../Redux/Url";
import DeliveryStatusAnimation from "../components/DeliveryStatusAnimation";

const OrderScreen = ({ match }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    alert('Please proceed to the counter, thank you!');
  };
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${URL}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row order-detail d-flex justify-content-center align-items-center ">
                    
                    <div className="row justify-content-center">
                        <div className="col text-center">
                          <img src="/images/paid.png" width={50} height={50} alt="" />
                          <span>Order Confirmed</span>
                          <div className="checkedIcon">
                            <img src="/images/checked.png" width={20} height={20} alt="" />
                          </div>
                        </div>
                
            
                      </div>
                    
            
                  </div>
                  

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
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
                          <h6>Php {item.qty * item.price}.00</h6>
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
                      <td>Php {order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>Php {order.shippingPrice}.00</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>Php {order.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>Php {order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {!order.isDelivered ? (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <div className="text-center mb-4">
                        <h5>Your order is now preparing...</h5>
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                ) : (
                  <div className="col-12">
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleButtonClick}
                    >
                      Pay at the counter
                    </button>
                    {isButtonClicked && (
                      <p className="text-center">Please proceed to the counter, thank you!</p>
                    )}
                  </div>

                )}
              </div>
              {order.isDelivered ? (
                   <div className="p-2 col-12">
                    <p className="text-black text-center text-sm-start">
                      Served {moment(order.deliveredAt).calendar()}
                    </p>
                 </div>
                 
                    ) : (
                      <div className={`p-2 col-12 ${order.isDelivered ? '' : 'blink-animation'}`}>
                      {!order.isDelivered && (
                        <div className="d-flex align-items-center justify-content-center">
                          <img src="/images/bake.png" width={60} height={60} alt="" />
                          <p className="text-center ms-2">
                            Preparing
                          </p>
                        </div>
                      )}
                      {order.isDelivered && (
                        <p className="text-center">Not Delivered</p>
                      )}
                    </div>
                    

                    )}
            </div>

           
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
