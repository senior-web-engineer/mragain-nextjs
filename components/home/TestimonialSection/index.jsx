import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { H2, SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import media from "@/utils/media";
import SliderOnMobile from "@/components/common/SliderOnMobile";

const MainWrap = styled.div`
  border-radius: 200px;
  padding: 115px 0 0 0;
  position: relative;

  ${media.tablet`
    background-color: #f0f0f0;
    padding-left: 100px;
    left: -100px;
  `}
`;

const ContentWrap = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;

  ${Button} {
    margin-top: 20px;
    min-width: 51px;
    font-weight: bold;

    ${media.desktop`
      span {
        display: none;
      }
    `}
  }

  ${media.desktop`
    flex-direction: row;
  `}
`;

const STATS = [
  {
    count: "24",
    label: "Aantal reparaties",
  },
  {
    count: "65",
    label: "Aangesloten reparateurs",
  },
  {
    count: "1,500",
    label: "Aanbod aan reparaties",
  },
];

const TESTIMONIAL_DATA = [
  {
    author: "Jan",
    location: "Utrecht",
    review: (
      <>
        Door de samenwerking met MrAgain hoeven we ons minder zorgen te maken om
        onze marketing. Klanten maken afspraken bij ons doordat ze de goede
        reviews en voorwaarden zien. Hierdoor kunnen wij ons focussen op waar we
        echt goed in zijn.
        <p>Dat is het repareren van jouw device!</p>
      </>
    ),
  },
  {
    author: "Marcel",
    location: "Den Haag",
    review: (
      <>
        Sinds we op MrAgain staan hebben we veel meer online afspraken dan
        daarvoor. Dit helpt ons doordat we vantevoren weten wie er langs komt in
        de zaak. We hebben alle materialen dan op voorhand, en mocht dat niet zo
        zijn dan regelen we het snel.
        <p>Voor ons is MrAgain tot nu toe een echte verademing!</p>
      </>
    ),
  },
];

const StatsWrap = styled.div`
  flex-grow: 1;
  display: flex;

  ${media.desktop`
    margin-right: 50px;
  `}
`;

const StatWrap = styled.div`
  width: 131px;
  height: 150px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 4px;

  h6 {
    font-size: 22px;
    line-height: 8px;
    color: #06c987;
    font-weight: 500;
  }

  label {
    font-size: 12px;
    line-height: 15px;
    color: #303030;
    font-weight: 500;
  }
`;

const Testimonial = styled.div`
  border-radius: 20px;
  background-color: #ffffff;

  padding: 30px;
  font-size: 13px;
  color: #707070;
  font-weight: 300;
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 150px;
  margin: 19px 20px 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04), 0 2px 2px rgba(0, 0, 0, 0.04),
    0 4px 4px rgba(0, 0, 0, 0.04), 0 6px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04);

  .svg-inline--fa {
    color: #0f75bc;
    font-size: 30px;
    position: absolute;
    top: -15px;
    right: 20px;
  }

  ${media.desktop`
    width: 430px;
    margin: 19px 10px 0 10px;
  `}
`;

const SliderWrap = styled.div`
  ${media.desktop`
    margin-top: -180px;
  `}
`;

const TestimonialAuthor = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #0f75bc;
  font-weight: 400;
  text-align: right;
  width: 66px;
  margin-left: 20px;
  white-space: nowrap;

  p {
    margin: 0;
  }

  location {
    font-size: 10px;
    line-height: 20px;
    color: #a0a0a0;
    font-weight: 400;
    text-align: right;
  }
`;

export default function TestimonialSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    vertical: true,
    arrows: false,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  function renderStat(stat) {
    return (
      <StatWrap key={stat.label}>
        <h6>{stat.count}</h6>
        <label>{stat.label}</label>
      </StatWrap>
    );
  }

  function renderTestimonial(testimonial, index) {
    return (
      <div key={index}>
        <Testimonial>
          <FontAwesomeIcon className="icon-xxl" icon={["fas", "quote-right"]} />
          <div>{testimonial.review}</div>
          <TestimonialAuthor>
            <p>{testimonial.author}</p>
            <location>{testimonial.location}</location>
          </TestimonialAuthor>
        </Testimonial>
      </div>
    );
  }

  return (
    <MainWrap>
      <SubTitle>Over mragain.nl</SubTitle>
      <H2>Wat klanten zeggen</H2>
      <ContentWrap>
        <div>
          <StatsWrap>{STATS.map(renderStat)}</StatsWrap>
          <Button>
            {" "}
            <span>Meer reviews</span> <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
        <SliderWrap>
          <SliderOnMobile>
            {TESTIMONIAL_DATA.map(renderTestimonial)}
          </SliderOnMobile>
        </SliderWrap>
      </ContentWrap>
    </MainWrap>
  );
}
