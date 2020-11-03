import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./TestmonialCarousel.style.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prev from "@/assets/images/prev-arrow.jpg";
import next from "@/assets/images/next-arrow.jpg";

export default function TestimonialCarousel() {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const prevArrow = (
    <SlickButtonFix>
      <img src={prev} alt="" />
    </SlickButtonFix>
  );
  const nextArrow = (
    <SlickButtonFix>
      <img src={next} alt="" />
    </SlickButtonFix>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <div>
            <p>
	     Via MrAgain heb ik eenvoudig en snel een goede reparateur bij mij in 
	     de buurt kunnen vinden. Een afspraak maken was zo gepiept. 
            </p>
            <p>
	    Na de reparatie ontving ik een garantie bewijs in mijn email, 
	    maar deze heb ik helemaal niet nodig, hij doet het perfect! 
            </p>
            <p>
	    Ik kan iedereen die een reparateur zoekt MrAgain van harte aanbevelen! 
            </p>
          </div>
          <div className="testmonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testmonial-footer">
            <p>Janneke</p>
            <p>Utrecht</p>
          </div>
        </div>
        <div>
          <div>
            <p>
	    Mijn telefoon was goed kapot doordat deze in een plas water was gevallen.
	    Via MrAgain kon ik makkelijk zien wie mijn telefoon kon repareren.
            </p>
            <p>
	    Na het inzien van enkele reviews en de prijzen en garanties,
	    heb ik een afspraak gemaakt.
            </p>
            <p>
	    De telefoon is perfect gerepareerd en de mensen waren erg vriendelijk,
	    ik ga zeker terug!
            </p>
          </div>
          <div className="testmonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testmonial-footer">
            <p>Bram</p>
            <p>Rotterdam</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}
