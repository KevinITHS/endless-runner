import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";

import "./About.css";

import character1 from "../img/character1.png";
import character2 from "../img/character2.png";
import character3 from "../img/character3.png";
import pixelArrow from "../img/pixelarrow.png";
import pixelArrowLeft from "../img/pixelarrowleft.png";

const slideDisplay = [
  {
    crab: character1,
    title: "RED CRAB",
    color: "#bc5a4c",
  },
  {
    crab: character2,
    title: "BLUE CRAB",
    color: "#0096ff",
  },
  {
    crab: character3,
    title: "GOLDEN CRAB",
    color: "#ffd700",
  },
];

const faqData = [
  {
    question: "What is Crab Runner?",
    answer:
      "Crab Runner is an endless runner game where you navigate different levels with various types of crabs.",
  },
  {
    question: "How do I unlock new levels?",
    answer:
      "You unlock new levels by scoring higher. The same goes for unlocking the crabs.",
  },
  {
    question: "What technologies are used in Crab Runner?",
    answer: "Crab Runner is made with HTML, CSS, and React.js.",
  },
  {
    question: "Is Crab Runner a finished game?",
    answer:
      "No, Crab Runner is currently just a prototype. Future development is possible.",
  },
  {
    question: "Can I play Crab Runner on my phone?",
    answer:
      "Unfortunately, Crab Runner is currently only optimized for PC and tablets. But we are working on it!",
  },
  {
    question: "Who made the crab art?",
    answer:
      "The designer of the crab art is an artist named Evan Gassman. Here are his socials: https://linktr.ee/evancgassman.",
  },
  {
    question: "What about the maps?",
    answer:
      "The maps are parallax backgrounds made by The Pixel Nook, here is his itch.io profile: https://the-pixel-nook.itch.io.",
  },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-question" onClick={toggleAccordion}>
        <h3>{question}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordion-answer">{answer}</div>}
    </div>
  );
};

const FAQAccordion = ({ data }) => {
  return (
    <div className="faq-accordion">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(slideDisplay[0]);
  const [showFAQ, setShowFAQ] = useState(false);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex % slideDisplay.length; // make sure index stays within bounds
    setCurrentSlide(newIndex);
  };

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };

  useEffect(() => {
    setCurrentDisplay(slideDisplay[currentSlide]);
  }, [currentSlide]);

  useEffect(() => {
    const focusedImage = document.querySelector(".swiper-slide-active img");
    if (focusedImage) {
      focusedImage.style.transition = "transform 1s ease-in-out";
      focusedImage.style.animation = "idleAnimation 2s infinite";
    }
  }, [currentSlide]);

  return (
    <div className="about">
      <h1>Crab Runner</h1>
      <h3>
        Crab Runner is a game where you navigate different levels with various
        types of crabs.
      </h3>
      <h4>Unlock new levels and crabs as you score higher!</h4>
      <div className="cube-carousel-container">
        <Swiper
          effect={"cube"}
          grabCursor={true}
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
          }}
          loop={true}
          modules={[EffectCube, Navigation]}
          className="cubeSwiper"
          onSlideChange={handleSlideChange}
          cubeEffect={{
            slideShadows: false,
          }}
        >
          {slideDisplay.map((item, index) => (
            <SwiperSlide
              key={index}
              className={currentSlide === index ? "active" : ""}
            >
              <img src={item.crab} alt={`${item.color}`} />
              <div
                className="title-container"
                style={{
                  backgroundColor: "#333",
                  width: "85%",
                  height: "35px",
                  margin: "0 auto",
                }}
              >
                <h2 style={{ color: item.color }}>{item.title}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="button-prev">
          <img src={pixelArrowLeft} alt="Previous" />
        </div>
        <div className="button-next">
          <img src={pixelArrow} alt="Next" />
        </div>
      </div>
      <div className="textBody"></div>
      <p>
        The game is made with a "no game engine" approach and opens up
        possibilities for future development for a more refined game.
      </p>
      <p className="uppercase"> This is currently just a prototype.</p>
      <div className="faq-section">
        <button onClick={toggleFAQ}>{showFAQ ? "Hide FAQ" : "Show FAQ"}</button>
        {showFAQ && <FAQAccordion data={faqData} />}
      </div>
    </div>
  );
};

export default About;
