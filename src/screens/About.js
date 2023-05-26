import React from "react";
import Header from "./../components/Header";

const About = () => {
  return (
    <>
      <Header />
        <div class="container about-container">
            <div class="row">
                <div class="col-md-6 ">
                    <h1 class="h1-head">About Our Pizza Shop</h1>
                        <p class="p-head">We are a family-owned pizza shop located in the heart of the city. Our mission is to provide the best quality pizzas using only the freshest ingredients. </p>
                        <p>Our pizzas are made from scratch daily, using our special blend of flour and secret recipe sauce. We have a variety of toppings to choose from, including classic pepperoni, sausage, mushrooms, and olives, as well as some unique options like pineapple and jalapenos,  we also offer gluten-free and vegan options for those with dietary restrictions.</p>
                </div>
            <div class="col-md-6">
            <img src="https://images.pexels.com/photos/15197931/pexels-photo-15197931.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Pizza shop" class="img-fluid" />
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h2 class="h2-head">Our Story</h2>
                    <p class="p2-head">Our pizza shop was founded by our grandfather, who immigrated to the United States from Italy in the 1950s. He brought with him the family recipes and a passion for making delicious pizza. </p>

                    <p>Over the years, our family has worked hard to keep the tradition alive and continue to serve the best pizza in town. We are proud to be part of the community and to share our love for pizza with our customers.</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
            <h2 class="h2-head">Meet Our Team</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="Team member 1" class="img-thumbnail" />
                <h4 class="h4-head">John Doe</h4>
                <p>Chef</p>
            </div>
            
            <div class="col-md-4">
                <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="Team member 2" class="img-thumbnail" />
                <h4 class="h4-head">Jane Smith</h4>
                <p>Bartender</p>
            </div>

            <div class="col-md-4">
                <img src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg" alt="Team member 3" class="img-thumbnail" />
                <h4 class="h4-head">Mike Johnson</h4>
                <p>Delivery Driver</p>
            </div>
        </div>
        </div>
    </>
  );
};

export default About;
