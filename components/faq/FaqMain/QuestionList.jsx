import React from 'react'
import Question from './Question'
import { OuterContainer } from '@/components/faq/FaqMain/Faq.style'

const QuestionList = ({ data }) => {
  return (
    <OuterContainer>
      {data.map((item, index) => {
        return <Question key={index} data={item} />
      })}
    </OuterContainer>
  )
}

export default QuestionList
