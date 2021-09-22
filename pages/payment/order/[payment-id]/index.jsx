import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import api from "@/utils/api";
import { API_PATH } from "@/constants";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";

//

export default function PaymentStatusPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadData() {
      const id = router.query["payment-id"];
      const data = await api.get(API_PATH.GETPAYMENT(id));
      setData(data);
    }

    loadData();
  }, []);

  return (
    <DefaultLayout>
      <MaxConstraints>{data?.[0]?.payment_status}</MaxConstraints>
    </DefaultLayout>
  );
}
