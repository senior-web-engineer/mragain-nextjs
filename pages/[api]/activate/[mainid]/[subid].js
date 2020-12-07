import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    verifyAccount
} from "service/account/operations";

const AccountVerification = () => {
    const router = useRouter();
    const { mainid, subid } = router.query;
    const success = "Je account is geactiveerd, je kunt nu inloggen!";

    const data = {
        mainid: mainid,
        subid: subid,
    }
    const [notification, setNotification] = useState("");

    verifyAccount(data).then((res) => {
        setNotification(res.data);
    });

    useEffect(() => {
        if(notification === success) {
            setTimeout(() => {
                router.push('/')
            }, 3000);
        }
    }, [notification])

    return (
        <div>
            {notification}
        </div>
    )
}

export default AccountVerification;
