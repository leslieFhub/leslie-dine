import React from "react";

const DeliveryStatusAnimation = ({ isDelivered }) => {
  return (
    <div className="row delivery-status-animation">
      <div className="col-lg-12">
        <div className="p-2 col-12">
          <div className="text-center text-sm-start preparing">
            {isDelivered ? (
              <>
                <img
                  src="https://static.thenounproject.com/png/12345-200.png" // Replace with the delivered picture URL
                  alt="Delivered"
                  className="status-image blink-animation"
                />
                <span className="status-text" style={{ color: "black" }}>  Delivered</span>
              </>
            ) : (
              <>
                <div className="blink-animation">
                  <img
                    src="https://static.thenounproject.com/png/5265480-200.png" // Replace with the preparing picture URL
                    alt="Preparing"
                    className="status-image"
                  />
                  <span className="status-text" style={{ color: "black" }}>  Preparing pizza</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatusAnimation;
