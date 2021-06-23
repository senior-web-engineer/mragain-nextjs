import "./styles.less";
import React, { useState } from "react";
import cookieCutter from "cookie-cutter";
import {
    cookieMainView,
    cookieManageConcentView,
} from "./helpers";


export const CookieBanner = ({ onCookiesChanged }) => {
    const [concents, setConcents] = useState([
        {
            id: "rcl_consent_given",
            text: "Strictly Necessary",
            active: true,
            description:
                "These cookies are necessary for the website to function and cannot be switched off in our systems.",
        },
        {
            id: "rcl_analytics_consent",
            text: "Analytics Cookies",
            active: false,
            description: "Cookie description",
        },
        {
            id: "rcl_functional_consent",
            text: "Functional Cookies",
            active: false,
            description: "Cookie description",
        },
        {
            id: "rcl_targeting_consent",
            text: "Targeting Cookies",
            active: false,
            description: "Cookie description",
        },
    ]);
    const [manageConcent, setManageConcent] = useState(false);

    const onAcceptCookies = () => {
        concents.forEach((concent) => {
            cookieCutter.set(concent.id, `true`);
        });
        onCookiesChanged();
    };

    const onRejectAll = () => {
        cookieCutter.set("rcl_consent_given", "true");
        onCookiesChanged();
    };

    const onSaveSettings = () => {
        concents.forEach((concent) => {
            if (concent.active) {
                cookieCutter.set(concent.id, concent.active);
            }
        });
        onCookiesChanged();
    };

    const onConcentChanged = (data) => {
        console.log(data);
        const newConcents = concents.map((concent) => {
            if (concent.id === data.id) {
                concent.active = data.active;
            }
            return concent;
        });
        setConcents(newConcents);
    };

    return (
        <div className="cookie-banner">
            {manageConcent
                ? cookieManageConcentView(
                      concents,
                      onSaveSettings,
                      onRejectAll,
                      onConcentChanged
                  )
                : cookieMainView(onAcceptCookies, setManageConcent)}
        </div>
    );
};
