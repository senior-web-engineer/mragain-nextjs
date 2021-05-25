import React from "react";
import QandA from './QandA'

const Question = ({title, faqs}) => {

    let tit = "title1"
    let fqs = [
        {question:'asdasdasd',
         answer: 'answer1'   },
         {question:'asdasdasd',
         answer: 'answer2'   },
    ]
    return (
        <div style={{height:'100px', background: 'red'}}>
                {fqs.map((faq, idx)=> {
                    return (
                        <QandA key={idx} question={faq.question} answer={faq.answer} />
                    )
                })}
        </div>
    )
}

export default Question