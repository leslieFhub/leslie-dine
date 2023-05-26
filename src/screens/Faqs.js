import React from "react";
import Header from "./../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div class="container my-5">
        <h1 class="text-center">Do you have any Questions?</h1>
            <h4 class="faq-header">
                Welcome to our Frequently Asked Questions page. Here, we have compiled a list of the most commonly asked questions by our customers. We hope that this page will provide you with the information you need. If you have any additional questions, please feel free to contact us.
            </h4>

      <div class="accordion" id="faqAccordion">
        <div class="card">
          <div class="card-header" id="question1">
            <h2 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#answer1" aria-expanded="true" aria-controls="answer1">
                <b>How do I place an order?</b>
              </button>
            </h2>
          </div>
          <div id="answer1" class="collapse show" aria-labelledby="question1" data-parent="#faqAccordion">
            <div class="card-body">
              To place an order, simply visit our website or give us a call. Our friendly staff will be happy to assist you.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="question2">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#answer2" aria-expanded="false" aria-controls="answer2">
                <b>Do you offer delivery?</b>
              </button>
            </h2>
          </div>
          <div id="answer2" class="collapse" aria-labelledby="question2" data-parent="#faqAccordion">
            <div class="card-body">
              Yes, we offer delivery within a 5-mile radius. Delivery fees may apply.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="question3">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#answer3" aria-expanded="false" aria-controls="answer3">
                <b>Do you offer delivery outside Metro Manila?</b>
              </button>
            </h2>
          </div>
          <div id="answer3" class="collapse" aria-labelledby="question3" data-parent="#faqAccordion">
            <div class="card-body">
              Yes, we offer delivery outside Metro Manila. Delivery fees may apply.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="question4">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#answer4" aria-expanded="false" aria-controls="answer4">
                <b>What toppings do you offer?</b>
              </button>
            </h2>
          </div>
          <div id="answer4" class="collapse" aria-labelledby="question4" data-parent="#faqAccordion">
            <div class="card-body">
              We offer a variety of toppings, including pepperoni, sausage, mushrooms, onions, peppers, and more.
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default About;
