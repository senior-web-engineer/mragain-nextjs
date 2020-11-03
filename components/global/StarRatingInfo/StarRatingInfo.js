import React from "react";
import { Rate } from "antd";
import "./StarRatingInfo.less";

const StarRatingInfo = params => {
  return (
    <div className="star-rate-info">
      <span className="ant-rate-text">{params.rate}</span>
      <Rate value={parseInt(params.rate)} className="star-rate" />
    </div>
  );
};

export default StarRatingInfo;
