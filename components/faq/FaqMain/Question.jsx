import React, { useState } from "react";
import { InnerContainer, Title, Content, TitleText, Underline, QuestionContainer, AnswerContainer, BlockText, PlusMinusButton } from "@/components/faq/FaqMain/Faq.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";


const Question = ({ data }) => {
    let { title, faq } = data

    return (
        <InnerContainer>
            <Title>
                <TitleText>
                    {title}
                </TitleText>
                <Underline></Underline>
            </Title>
            <Content>
                <Block faq={faq} />
            </Content>
        </InnerContainer>
    )
}

export default Question

const Block = ({ faq }) => {
    const [clicked, setClicked] = useState(false)

    const toggle = index => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }
    return (
        faq.map((item, index) => {
            let { a, q, isOpen } = item
            return (
                <Fragment key={index}>
                    <QuestionContainer onClick={() => toggle(index)}>
                        <BlockText>
                            {q}
                        </BlockText>
                        <PlusMinusButton>
                            {clicked !== index ? <FontAwesomeIcon icon={faPlus} style={{ color: "#1CC174" }} /> :
                                <FontAwesomeIcon icon={faMinus} style={{ color: "#1CC174" }} />}
                        </PlusMinusButton>
                    </QuestionContainer>
                    {clicked === index && <AnswerContainer >
                        <BlockText>
                            {a}
                        </BlockText>
                    </AnswerContainer>}
                </Fragment>)
        })

    )
}