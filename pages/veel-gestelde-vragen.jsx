import React, { useEffect, useState, useMemo } from 'react'
import {
  Main,
  Top,
  Content,
  FAQTitle,
  FAQSubtitle,
  FAQInput,
  FAQInputContainer,
  FAQsvg,
} from '@/styled-components/veel-gestelde-vragen.style'
import DefaultLayout from '@/components/layouts/Homepage'
import Head from 'next/head'
import { FRONT_END_URL } from '../constants.js'
import QuestionList from '@/components/faq/FaqMain/QuestionList'
import GetInTouch from '@/components/faq/FaqMain/GetInTouch'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // dummy data
  let SampleData = [
    {
      title: 'Guarantee',
      faq: [
        {
          question: 'How about my warranty?',
          answer: '100% return for free',
        },

        {
          question: 'How much warranty do I have on my repair?',
          answer: 'Lorem ipsum answer sample',
        },
        {
          question:
            'What can I do if the repairer and I disagree on the warranty?',
          answer: 'Lorem ipsum answer sample',
        },
      ],
    },
    {
      title: 'Payment',
      faq: [
        {
          question: 'Where and how do I pay for my repair?',
          answer: '100% return for free',
        },
        {
          question: 'How much warranty do I have on my repair?',
          answer: 'Lorem ipsum answer sample',
        },
      ],
    },
  ]

  const [data, setData] = useState(SampleData)
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filterFAQs = (searchValue) => {
    // No search term - Display Everything
    if (searchValue == '') return data

    // Filter Faq Array by searchValue
    let filtered = data.map((item) => {
      return {
        ...item,
        faq: item.faq.filter((faq) =>
          faq.question.toLowerCase().includes(searchValue.toLowerCase())
        ),
      }
    })
    return filtered
  }

  const filteredData = useMemo(() => {
    return filterFAQs(searchTerm)
  }, [searchTerm])

  return (
    <DefaultLayout>
      <Main>
        <Head>
          <title>Veel gestelde vragen | Mr Again</title>
          <meta
            name='Keywords'
            content='Veel gestelde vragen, Mr Again, FAQ Mr Again, Telefoon reparaties, Telefoon reparateur, telefoonscherm, garantie, kwaliteit'
          />
          <meta
            name='description'
            content='Je vindt hier antwoorden op de veel gestelde vragen aan MrAgain, staat je vraag er niet bij, neem dan contact met ons op!'
          />
          <link
            rel='canonical'
            href={FRONT_END_URL + '/veel-gestelde-vragen'}
          />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property='og:type' content='website' />
          <meta name='og_title' property='og:title' content='FAQ' />
          <meta
            property='og:description'
            content='Vind de beste reparateur bij jou in de buurt'
          />
          <meta name='og:url' content={FRONT_END_URL} />
          <meta property='og:image' content='' />
          <meta
            name='og_site_name'
            property='og:site_name'
            content='Mr Again'
          />
        </Head>
        <Top>
          <FAQTitle>FREQUENTLY ASKED QUESTIONS</FAQTitle>
          <FAQSubtitle>Hi! How can we help you?</FAQSubtitle>
          <FAQInputContainer>
            <FAQInput
              onChange={(e) => handleOnChange(e)}
              placeholder='Search our knowledgebase'
            />
            <FAQsvg>
              <FontAwesomeIcon icon={faSearch} style={{ color: '#e0e0e0' }} />
            </FAQsvg>
          </FAQInputContainer>
        </Top>
        <Content>
          <QuestionList data={filteredData} />
          <GetInTouch />
        </Content>
      </Main>
    </DefaultLayout>
  )
}

export default Faq
