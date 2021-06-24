import "./styles.less";
import React, { useState } from "react";
import cookieCutter from "cookie-cutter";

import { CookieManageConcentView } from "./CookieManageConcentView";
import { CookieMainView } from "./CookieMainView";

const getCookieState = (id) => {
    return Boolean(cookieCutter.get(id)) || false;
};

export const CookieBanner = () => {
    const isConcentGiven = cookieCutter.get("rcl_consent_given");

    const [cookiesActive, setCookiesActive] = useState(isConcentGiven === "true");
    const [manageConcent, setManageConcent] = useState(false);
    const [concents, setConcents] = useState([
        {
            id: "rcl_consent_given",
            text: "Noodzakelijke cookies",
            active: true,
            description:
                "These cookies are necessary for the website to function and cannot be switched off in our systems.",
        },
        {
            id: "rcl_analytics_consent",
            text: "Analytics Cookies",
            active: getCookieState("rcl_analytics_consent"),
            description: "Cookie description",
        },
        {
            id: "rcl_functional_consent",
            text: "Functional Cookies",
            active: getCookieState("rcl_functional_consent"),
            description: "Cookie description",
        },
        {
            id: "rcl_targeting_consent",
            text: "Targeting Cookies",
            active: getCookieState("rcl_targeting_consent"),
            description: "Cookie description",
        },
    ]);

    const onCookiesSet = () => {
        setCookiesActive(true);
    };

    const onAcceptCookies = () => {
        concents.forEach((concent) => {
            cookieCutter.set(concent.id, `true`);
        });
        onCookiesSet();
    };

    const onRejectAll = () => {
        cookieCutter.set("rcl_consent_given", "true");
        onCookiesSet();
    };

    const onSaveSettings = () => {
        concents.forEach((concent) => {
            if (concent.active) {
                cookieCutter.set(concent.id, concent.active);
            }
        });
        onCookiesSet();
    };

    const onConcentChanged = (data) => {
        setConcents(concents =>
            concents.map((concent) => {
                if (concent.id === data.id) {
                    concent.active = data.active;
                }
                return concent;
            })
        );
    };

    if (cookiesActive) {
        return <></>;
    }

    return (
        <div className="cookie-banner">
            {manageConcent ? (
                <CookieManageConcentView
                    concents={concents}
                    onSaveSettings={onSaveSettings}
                    onRejectAll={onRejectAll}
                    onConcentChanged={onConcentChanged}
                />
            ) : (
                <CookieMainView
                    onAcceptCookies={onAcceptCookies}
                    setManageConcent={setManageConcent}
                />
            )}
        </div>
    );
};