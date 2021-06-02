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
      title: 'Garantie',
      faq: [
        {
          question: 'Hoe zit het met de garantie?',
          answer: 'Na je reparatie ontvang je je garantiebewijs in je email, daarin staat ook tot wanneer je garantie hebt.',
        },

        {
          question: 'Hoeveel garantie heb ik op mijn reparatie?',
          answer: 'Alle reparateurs die bij MrAgain zijn aangesloten geven aan hoeveel garantie ze geven. Je kunt dit zien op de pagina van de betreffende reparateur. Let op: voor waterschade reparaties geldt vaak een maximale garantie van 3 maanden.',
        },
        {
          question:
            'Wat kan ik doen als de reparateur en ik het niet eens zijn over de garantie?',
          answer: 'Het is vervelend als jij en de reparateur van mening verschillen over de reparatie. Kom je er samen niet uit dan zullen we hierin bemiddelen. Let wel op: garante geldt alleen voor de reparatie en het gerepareerde onderdeel en vervalt bij zichtbare schade.',
        },
      ],
    },
    {
      title: 'Betalen',
      faq: [
        {
          question: 'Waar en hoe moet ik betalen voor mijn reparatie?',
          answer: 'Je betaalt bij de reparateur nadat deze de reparatie heeft uitgevoerd.',
        },
        {
          question: 'Wat betaal ik voor mijn reparatie?',
          answer: 'Je betaalt het bedrag dat vooraf is afgesproken voor de reparatie. Natuurlijk kan dit wijzigen als blijkt dat er een andere reparatie nodig is. De reparateur bespreekt dit dan met je.',
        },
      ],
    },
    {
      title: 'Reparatie',
      faq: [ 
	{
          question: 'Hoe lang duurt mijn reparatie?',
	  answer: 'De duur van je reparatie hangt af van de soort reparatie de beschikbaarheid van de reparateur. Normaal gesproken worden de meeste reparaties nog dezelfde dag uitgevoerd, lukt dit niet dan zal de reparateur dit met je bespreken.',
        },
      ],
    },
    {
      title: 'Feedback en klachten',
      faq: [
	{
          question: 'Ik heb feedback of een klacht, hoe kan ik contact met jullie opnemen?',
	  answer: 'Je kunt ons gemakkelijk bereiken via onze contact pagina of mailen naar info@mragain.nl. We proberen dan zo snel mogelijk contact met je op te nemen!',
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
          <FAQSubtitle>Hi! Hoe kunnen we je helpen?</FAQSubtitle>
          <FAQInputContainer>
            <FAQInput
              onChange={(e) => handleOnChange(e)}
              placeholder='Zoek in onze FAQ'
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
