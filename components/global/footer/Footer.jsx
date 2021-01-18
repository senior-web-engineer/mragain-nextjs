import React from "react";
import { Icon } from "antd";
import { useRouter } from "next/router";
import {
  FooterViewSection,
  FooterViewContainer,
  FooterViewContent,
  FooterCopyright,
  FooterBrandArea,
  FooterBrandLogo,
  FooterLogoIcon,
  FooterBrandTitle,
  LogoTopTitle,
  LogoBottomTitle,
  FooterBrandContent,
  FooterLinkArea,
  FooterSitemap,
  FooterSitemapTitle,
  FollowUs,
  FollowUsTitle,
} from "./Footer.style";
import "./Footer.less";
import logo from "@/assets/images/logo.png";
import { CookieBanner } from "@palmabit/react-cookie-law";
import Link from "next/link";
import { FRONT_END_URL } from "../../../constants.js";

// const IconFont = () => Icon.createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
// });

const FooterView = ({ location }) => {
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
    splitUrl === "/contact" ||
    splitUrl === "/prijs" ||
    splitUrl === "/reparatie-en-service" ||
    splitUrl === "/maak-een-account-aan" ||
    splitUrl === "/login" ||
    splitUrl === "/meld-je-aan-als-reparateur" ||
    splitUrl === "/veel-gestelde-vragen" ||
    splitUrl === "/checkout-review" ||
    splitUrl === "/reset-je-wachtwoord" ||
    splitUrl === "/bevestig-je-wachtwoord-reset"
      ? "flex"
      : "none";

  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  return (
    <FooterViewSection>
      <FooterViewContainer show={visible}>
        <FooterViewContent>
          <FooterBrandArea ClassName="custm-footer-brandarea">
            <FooterBrandLogo>
              <FooterLogoIcon>
                <img
                  src={logo}
                  width="120"
                  height="46"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
              </FooterLogoIcon>
              <FooterBrandTitle>
                <LogoTopTitle></LogoTopTitle>
                <LogoBottomTitle></LogoBottomTitle>
              </FooterBrandTitle>
            </FooterBrandLogo>
            <FooterBrandContent className="footer-brand-content">
              De beste reparateurs voor jouw device, die vind je bij MrAgain.
              Wij geloven dat de wereld net een beetje mooier wordt als we er
              voor kunnen zorgen dat de levensduur van jouw device verlengd
              wordt.
              <br />
              {/* <a href="#more">More..</a> */}
            </FooterBrandContent>
          </FooterBrandArea>
          <FooterLinkArea className="footer-link-area">
            <FooterSitemap ClassName="custome-footer-sitename">
              <FooterSitemapTitle>Over MrAgain</FooterSitemapTitle>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/over-ons">Over ons</Link>
                </li>
                <li>
                  <Link href="/reparatie-en-service">Reparatie & Service</Link>
                </li>
                <li>
                  <Link href="meld-je-aan-als-reparateur">
                    Meld je aan als reparateur
                  </Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/veel-gestelde-vragen">FAQ</Link>
                </li>
                <li>
                  <Link href="/blog">Blogs</Link>
                </li>
                <li>
                  <Link href="/reparatie">Reparaties</Link>
                </li>
              </ul>
            </FooterSitemap>
            {/*<Servicing ClassName="custome-footer-servicing">
              <ServicingTitle>Servicing</ServicingTitle>
              <ul>
                <li>
                  <a href="#more">Lorem Ipsum</a>
                </li>
                <li>
                  <a href="#more">has been</a>
                </li>
                <li>
                  <a href="#more">the industry's</a>
                </li>
                <li>
                  <a href="#more">standard dummy</a>
                </li>
                <li>
                  <a href="#more">text ever</a>
                </li>
              </ul>
            </Servicing>*/}
            <FollowUs className="follow-us">
              <FollowUsTitle>Volg ons op</FollowUsTitle>
              <ul>
                <li className="facebook">
                  <a
                    href="https://www.facebook.com/Mr-Again-105437267708409/"
                    target="_blank"
                  >
                    <div className="icon-circle">
                      <IconFont type="icon-facebook" theme="filled" />
                    </div>
                    <div>Facebook</div>
                  </a>
                </li>
                <li className="twitter">
                  <a href="https://twitter.com/MrAgainofficial" target="_blank">
                    <div className="icon-circle">
                      <IconFont type="icon-twitter" theme="filled" />
                    </div>
                    <div>Twitter</div>
                  </a>
                </li>
                <li className="linkedin">
                  <a
                    href="https://www.linkedin.com/company/mragain/"
                    target="_blank"
                  >
                    <div className="icon-circle">
                      <Icon type="linkedin" theme="filled" />
                    </div>
                    <div>LinkedIn</div>
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href="https://www.instagram.com/mragainofficial/"
                    target="_blank"
                  >
                    <div className="icon-circle">
                      <Icon type="instagram" theme="filled" />
                    </div>
                    <div>Instagram</div>
                  </a>
                </li>
              </ul>
            </FollowUs>
          </FooterLinkArea>
        </FooterViewContent>
      </FooterViewContainer>
      <FooterCopyright> Copyright @ 2020 MrAgain </FooterCopyright>
      <CookieBanner
        message="We gebruiken cookies met als doel je een optimale gebruikerservaring te geven op onze website."
        necessaryOptionText="Ja, ik wil graag een optimale website"
        // cookie="user-has-accepted-cookies"
        declineButtonText="Negeer"
        acceptButtonText="Accepteer"
        // privacyPolicyLinkText="hhjghghkhjhjgj"
        showDeclineButton={true}
        showPreferencesOption={false}
        showStatisticsOption={false}
        showMarketingOption={false}
        policyLink={FRONT_END_URL + "/algemene-voorwaarden"}
        // styles={{
        //   dialog: {
        //     position: "absolute",
        //     top: "0px",
        //     left: "0px",
        //     right: "0px",
        //     zIndex: "100000",
        //     backgroundColor: "white",
        //     padding: "20px",
        //   },
        //   container: { backgroundColor: "white", marginRight: "50px" },
        //   // policy: { maxHeight: "20px" },
        //   policy: {
        //     fontSize: "10pt",
        //     marginLeft: "10px",
        //     color: "red",
        //     maxHeight: "20px",
        //     // overflow: "hidden",
        //     textDecoration: "underline",
        //   },
        //   button: {
        //     backgroundColor: "blue",
        //     marginTop: "30px",
        //     display: "inline",
        //     alignItems: "center",
        //     justifyContent: "center",
        //   },
        // }}
      />
    </FooterViewSection>
  );
};

export default FooterView;
