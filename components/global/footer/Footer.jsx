import "./Footer.less";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withUserAgent } from "next-useragent";
import React from "react";

import Cash from "@/assets/icons/cash.svg";
import Facebook from "@/assets/icons/facebook.svg";
import Google from "@/assets/icons/google.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import MasterCard from "@/assets/icons/mastercard.svg";
import Twitter from "@/assets/icons/twitter.svg";
import Visa from "@/assets/icons/visa.svg";
import { CookieBanner } from "@/components/cookie-banner/CookieBanner";

import {
  DevicesContainer,
  FollowUs,
  FollowUsTitle,
  FooterBrandArea,
  FooterBrandLogo,
  FooterBrandTitle,
  FooterButton,
  FooterCards,
  FooterCopyright,
  FooterLinkArea,
  FooterLogoIcon,
  FooterSitemap,
  FooterSitemapTitle,
  FooterSocialItems,
  FooterSocialItemTitle,
  FooterViewContainer,
  FooterViewContent,
  FooterViewSection,
  LogoBottomTitle,
  LogoTopTitle,
} from "./Footer.style";

const FooterView = (routerProps) => {
  const { location, ua, getDevices, shopDevices } = routerProps;

  const router = useRouter();
  const splitUrl = "/" + router.pathname.split("/")[1];
  const visible =
    splitUrl === "/" ||
    splitUrl === "/zoek-resultaten" ||
    splitUrl === "/profiel" ||
    splitUrl === "/maak-een-afspraak" ||
    splitUrl === "/bevestig-je-afspraak" ||
    splitUrl === "/over-ons" ||
    splitUrl === "/hoe-werkt-het" ||
    splitUrl === "/contact-met-mragain" ||
    splitUrl === "/prijs" ||
    splitUrl === "/reparatie" ||
    splitUrl === "/maak-een-account-aan" ||
    splitUrl === "/login" ||
    splitUrl === "/meld-je-aan-als-reparateur" ||
    splitUrl === "/veel-gestelde-vragen" ||
    splitUrl === "/checkout-review" ||
    splitUrl === "/reset-je-wachtwoord" ||
    splitUrl === "/bevestig-je-wachtwoord-reset";
  splitUrl === "/over-reparaties";
  splitUrl === "/blog" ? "flex" : "none";

  let notBot =
    ua &&
    ua.source &&
    !ua.isBot &&
    ua.source.toLowerCase().indexOf("google") < 0 &&
    ua.source.toLowerCase().indexOf("pagespeed") < 0 &&
    ua.source.toLowerCase().indexOf("lighthouse") < 0;
  return (
    <FooterViewSection>
      <FooterViewContainer show={visible}>
        <FooterViewContent>
          <FooterBrandArea ClassName="custm-footer-brandarea">
            <FooterBrandLogo>
              <FooterLogoIcon>
                <Image
                  quality={100}
                  loading={"eager"}
                  priority={true}
                  width={104}
                  height={40}
                  src="/images/mragain.svg"
                  alt="Logo Mr Again"
                />
              </FooterLogoIcon>
              <FooterBrandTitle>
                <LogoTopTitle></LogoTopTitle>
                <LogoBottomTitle></LogoBottomTitle>
              </FooterBrandTitle>
            </FooterBrandLogo>
            <p className="footer-brand-content">
              De beste reparateurs voor jouw device, die vind je bij MrAgain.
              Wij geloven dat de wereld net een beetje mooier wordt als we er
              voor kunnen zorgen dat de levensduur van jouw device verlengd
              wordt. Van waterschade, vervangen van je scherm of ingewikkelde
              moederbord reparaties, er is altijd een telefoon reparateur die je
              kan helpen met jouw telefoon reparatie.
              <br />
              {/* <a href="#more">More..</a> */}
            </p>
            <div className="footer-web-social">
              <FooterSocialItemTitle>Volg ons op</FooterSocialItemTitle>
              <FooterSocialItems>
                <div className="twitter">
                  <a
                    href="https://twitter.com/MrAgainofficial"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <img src={Twitter} alt="Twitter" />
                  </a>
                </div>
                <div className="linkedin">
                  <a
                    href="https://www.linkedin.com/company/38085922/admin/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                  <img src={Linkedin} alt="Linkedin" />
                  </a>
                </div>
                <div className="gmail">
                  <a
                    href="https://www.instagram.com/mragainofficial/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                  <img src={Google} alt="Google" />
                  </a>
                </div>
                <div className="facebook">
                  <a
                    href="https://www.facebook.com/MrAgainofficial/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                  <img src={Facebook} alt="Facebook" />
                  </a>
                </div>
              </FooterSocialItems>

              <FooterCards>
                <img src={Visa} alt="Visa" />
                <img src={MasterCard} alt="MasterCard" />
                <img src={Cash} alt="Cash" />
              </FooterCards>
            </div>
          </FooterBrandArea>
          <div>
            <FooterButton href="/">MELD JE REPARATIE AAN</FooterButton>
            <FooterLinkArea className="footer-link-area">
              <FooterSitemap ClassName="custome-footer-sitename">
                <FooterSitemapTitle>Over MrAgain</FooterSitemapTitle>
                <ul>
                  <li>
                    <Link prefetch={false} href="/over-ons">
                      Over ons
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/reparatie">
                      De voordelen
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/meld-je-aan-als-reparateur">
                      Meld je aan als reparateur
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/contact-met-mragain">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/veel-gestelde-vragen">
                      Veel gestelde vragen
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/blog">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </FooterSitemap>
              <FollowUs className="follow-us">
                <FollowUsTitle>steden</FollowUsTitle>
                <ul>
                  <li>
                    <Link prefetch={false} href="/amsterdam">
                      Amsterdam
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/rotterdam">
                      Rotterdam
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/den-haag">
                      Den Haag
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/utrecht">
                      Utrecht
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/groningen">
                      Groningen
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/den-bosch">
                      Den Bosch
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/tilburg">
                      Tilburg
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/maastricht">
                      Maastricht
                    </Link>
                  </li>
                </ul>
              </FollowUs>
            </FooterLinkArea>
            <FooterLinkArea className="footer-link-area">
              <FooterSitemap ClassName="custome-footer-sitename">
                <FooterSitemapTitle>Zoek je device</FooterSitemapTitle>
                <ul>
                  <li>
                    <Link prefetch={false} href="/devices/smartphone">
                      Smartphones
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/devices/tablet">
                      Tablets
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/devices/laptop">
                      Laptops
                    </Link>
                  </li>
                </ul>
              </FooterSitemap>
              <FollowUs className="follow-us">
                <FollowUsTitle>Reparaties</FollowUsTitle>
                <ul>
                  <li>
                    <Link prefetch={false} href="/devices/smartphone">
                      Telefoon reparatie
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/devices/tablet">
                      Tablet reparatie
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/devices/laptop">
                      Laptop reparatie
                    </Link>
                  </li>
                </ul>
              </FollowUs>
            </FooterLinkArea>
          </div>
          <div className="footer-mobile-social">
            <FooterSocialItemTitle>Volg ons op</FooterSocialItemTitle>
            <FooterSocialItems>
              <div className="twitter">
                <a
                  href="https://twitter.com/MrAgainofficial"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
              </div>
              <div className="linkedin">
	        <a
	          href="https://www.linkedin.com/company/mragain/"
	          target="_blank"
	          rel="noopener noreferrer nofollow"
	        >
                  <img src={Linkedin} alt="Linkedin" />
	        </a>
              </div>
              <div className="gmail">
	        <a
	          href="https://www.instagram.com/mragainofficial/"
	          target="_blank"
	          rel="noopener noreferrer nofollow"
	        >
                  <img src={Google} alt="Google" />
	        </a>
              </div>
              <div className="facebook">
	        <a
	          href="https://www.facebook.com/MrAgainofficial/"
	          target="_blank"
	          rel="noopener noreferrer nofollow"
	        >
                  <img src={Facebook} alt="Facebook" />
	        </a>
              </div>
            </FooterSocialItems>

            <FooterCards>
              <img src={Visa} alt="Visa" />
              <img src={MasterCard} alt="MasterCard" />
              <img src={Cash} alt="Cash" />
            </FooterCards>
          </div>
        </FooterViewContent>
      </FooterViewContainer>
      <FooterCopyright>
        Copyright @ 2022 MrAgain - info@mragain.nl
      </FooterCopyright>
      {!!notBot && <CookieBanner />}
    </FooterViewSection>
  );
};
export default withUserAgent(FooterView);
