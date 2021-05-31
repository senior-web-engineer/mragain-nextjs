import React, { useEffect, useState } from "react";
import {
  Main,
  Wrapper,
  Top,
  Content,
  FAQTitle,
  FAQSubtitle,
  FAQInput,
} from "@/styled-components/veel-gestelde-vragen.style";
import DefaultLayout from "@/components/layouts/Homepage";
import Head from "next/head";
import { FRONT_END_URL } from "../constants.js";
import QuestionList from "@/components/faq/FaqMain/QuestionList";
import GetInTouch from "@/components/faq/FaqMain/GetInTouch";

const Faq = ({}) => {
  let data = [
    {
      title: "Guarantee",
      faq: [
        {
          q: "How about my warranty?",
          a: "100% return for free",
        },

        {
          q: "How much warranty do I have on my repair?",
          a: "Lorem ipsum answer sample",
        },
        {
          q: "What can I do if the repairer and I disagree on the warranty?",
          a: "Lorem ipsum answer sample",
        },
      ],
    },
    {
      title: "Payment",
      faq: [
        {
          q: "Where and how do I pay for my repair?",
          a: "100% return for free",
        },
        {
          q: "How much warranty do I have on my repair?",
          a: "Lorem ipsum answer sample",
        },
      ],
    },
  ];
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOnChange = (evt) => {
    setSearchTerm(evt.target.value);
    setFilteredData(filterFAQs(searchTerm));
  };

  const filterFAQs = (string) => {
    // No search term - Display Everything
    if (string == "") return data;

    // Filter Faq Array By search term
    let filtered = data.map((item) => {
      return {
        ...item,
        faq: item.faq.filter((faq) =>
          faq.q.toLowerCase().includes(string.toLowerCase())
        ),
      };
    });
    return filtered;
  };

  return (
    <DefaultLayout>
      <Main>
        <Head>
          <title>Veel gestelde vragen | Mr Again</title>
          <meta
            name="Keywords"
            content="Veel gestelde vragen, Mr Again, FAQ Mr Again, Telefoon reparaties, Telefoon reparateur, telefoonscherm, garantie, kwaliteit"
          />
          <meta
            name="description"
            content="Je vindt hier antwoorden op de veel gestelde vragen aan MrAgain, staat je vraag er niet bij, neem dan contact met ons op!"
          />
          <link
            rel="canonical"
            href={FRONT_END_URL + "/veel-gestelde-vragen"}
          />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="FAQ" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
        </Head>
        <Top>
          <FAQTitle>FREQUENTLY ASKED QUESTIONS</FAQTitle>
          <FAQSubtitle>Hi! How can we help you?</FAQSubtitle>
          <FAQInput
            onChange={(e) => handleOnChange(e)}
            placeholder=" 🔍     Search our knowledgebase"
          />
        </Top>
        <Content>
          <QuestionList data={filteredData} />
          <GetInTouch />
        </Content>
      </Main>
    </DefaultLayout>
  );
};

export default Faq;
