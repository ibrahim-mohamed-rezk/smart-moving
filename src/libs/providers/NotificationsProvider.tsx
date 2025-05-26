"use client";

import axios, { AxiosHeaders } from "axios";
import { getData } from "../axios/server";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const NotificationsProvider = ({ token }: { token: string | undefined }) => {
  const locale = useLocale();
  useEffect(() => {
    const feachData = async () => {
      if (!token) return null;
      try {
        const response = await getData(
          "customer/has-hold-offers",
          {},
          new AxiosHeaders({
            lang: locale,
            Authorization: `Bearer ${token}`,
          })
        );

        await axios.post("/api/coockies/store-data-in-cookies", {
          has_hold: response.has_hold,
          un_read_message_count: response.un_read_message_count,
        });
      } catch (error) {
        console.log(error);
      }
    };
    feachData();
  }, [token, locale]);
  return null;
};

export default NotificationsProvider;
