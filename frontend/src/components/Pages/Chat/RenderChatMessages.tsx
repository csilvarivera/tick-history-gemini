import { useEffect, useRef } from 'react';
import { useChatContext } from './ChatContext';
import React, { useMemo , useState } from 'react'; 
import { Paragraph } from '@/components/Paragraph';
import { Typewriter } from '@/components/Typewriter';


export interface QuestionAndAnswerProps {
  question: string;
  answer: string | undefined;
  additional_context?: any; 
  isLast: boolean;
  role: "human" | "ai";
}

export function RenderQuestionAndAnswer({
  question,
  answer,
  additional_context,
  isLast,
}: QuestionAndAnswerProps) {
  const [isSqlVisible, setIsSqlVisible] = useState(false);

  
  const toggleSqlVisibility = () => {
    setIsSqlVisible(!isSqlVisible);
  };


  const { setCanSendRequest, canSendRequest } = useChatContext();

  const audioIconVariant = useMemo(() => {
    if (canSendRequest) {
      return 'done';
    } else {
      return isLast ? 'waiting' : 'done';
    }
  }, [canSendRequest, isLast]);
  
  return (
    <div className="flex flex-col gap-8">
      <Paragraph bold>{question}</Paragraph>
      <div className="flex gap-4">
        {audioIconVariant === 'done' ? ( <img className='w-6 h-6' src={'/images/googledotsstatic.png'}/> ) : ( <img className='w-12 h-12' src={'images/googledots.gif'}/> )}
        {answer && answer.length > 0 && (
          <React.Fragment>
            <div className="answer-container">
              <Typewriter content={answer} delay={5} onEnd={() => setCanSendRequest(true)} />  


              {additional_context && additional_context.text2sql_search_context && additional_context.text2sql_search_context !== '' && (           
                <>
                  <br></br>
                  {isSqlVisible && (
                    <div className="sql-container" style={{ display: isSqlVisible ? 'block' : 'none' }}>
                      <Typewriter content={additional_context.text2sql_search_context.sql_query} delay={10} />
                    </div>
                  )}
                  <br></br>
                  <button onClick={toggleSqlVisibility} className="sql-button" >
                    {isSqlVisible ? "Hide SQL Query" : "Show SQL Query"}
                  </button>                  
                </>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export function RenderChatMessages() {
  const { questionsAndAnswers } = useChatContext();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [questionsAndAnswers]);

  return (
    <div className="overflow-y-auto overflow-x-hidden flex flex-col-reverse h-screen-vh">
      <div className="flex flex-col gap-12 pb-20">
        {questionsAndAnswers.slice().map((questionAndAnswer, i) => {
          const isLast = i === questionsAndAnswers.slice().length - 1;
          const role = i % 2 === 0 ? "human" : "ai";
          
          return (
            <RenderQuestionAndAnswer
              key={i}
              isLast={isLast}
              role={role}
              {...questionAndAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
