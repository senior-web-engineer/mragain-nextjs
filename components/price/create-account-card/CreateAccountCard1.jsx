import React from "react";
import { Button } from "antd";
import Link from "next/link";
import "./CreateAccountCard.less";

const CreateAccountCard1 = params => {
  return (
    <div className="trial-month">
      <div className={"trial-month-title bgcolor-" + params.color}>
        <div>Professional</div>
      </div>
      <div className="trial-month-content">
        <div className="trial-month-content-title">
          <span></span>
          <span>
            <span className="price-value">Eenmalig €{params.price}</span> + €3.00 / afspraak
          </span>
        </div>
        <div className="trial-month-content-body">
          <p>Profielpagina</p>
          <p>Automatisch afspraken inplannen</p>
          <p>Reviews van je klanten</p>
          <p>Test</p>
          <p>Test</p>
          <p>Test</p>
          <p>Test</p>
          <Link href="/maak-een-account-aan">
            <Button className={"price-page-btn bgcolor-" + params.color}>
              CREATE ACCOUNT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountCard1;
