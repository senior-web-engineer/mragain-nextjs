import React from "react";
import Question from './Question'
import { OuterContainer } from "@/components/faq/FaqMain/Faq.style"

const QuestionList = ({ title, faqs }) => {

    let data = [
        {
            title: 'Guarantee',
            faq:
                [
                    {
                        isOpen: true,
                        q: 'How about my warranty?',
                        a: '100% return for free'
                    },

                    {
                        isOpen: false,
                        q: 'How much warranty do I have on my repair?',
                        a: 'Lorem ipsum answer sample'
                    },
                    {
                        isOpen: true,
                        q: 'What can I do if the repairer and I disagree on the warranty?',
                        a: 'Lorem ipsum answer sample'
                    }
                ]
        },
        {
            title: 'Payment',
            faq:
                [
                    {
                        isOpen: false,
                        q: 'Where and how do I pay for my repair?',
                        a: '100% return for free'
                    },
                    {
                        isOpen: false,
                        q: 'How much warranty do I have on my repair?',
                        a: 'Lorem ipsum answer sample'
                    },
                ]
        },

    ]
    return (
        <OuterContainer>
            {data.map((item, index) => {
                return (
                    <Question key={index} data={item} />
                )
            })}
        </OuterContainer>
    )
}

export default QuestionList