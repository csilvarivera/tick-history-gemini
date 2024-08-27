import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { Persona, RequestBody } from '@/app/api/backend/conversations/route.schema';
import { axios } from '@/axios';
import { AxiosError, AxiosResponse } from 'axios';

export interface QuestionAndAnswer {
  question: string;
  answer: string;
  additional_context?: any;
}

interface ChatContext {
  questionsAndAnswers: QuestionAndAnswer[];
  setQuestionsAndAnswers: (questionsAndAnswers: QuestionAndAnswer[]) => void;
  resetQuestionsAndAnswers: () => void;
  sendRequest: (question: string) => Promise<void>;
  setCanSendRequest: (canSendRequest: boolean) => void;
  canSendRequest: boolean;
  loading: boolean;
  userEmail: string | undefined;
  setUserEmail: (userEmail: string | undefined) => void;
  
}

const ChatContext = createContext<ChatContext>({
  questionsAndAnswers: [],
  setQuestionsAndAnswers: () => {},
  resetQuestionsAndAnswers: () => {},
  sendRequest: () => Promise.resolve(), // A function to send a new question to the backend, update the UI, and handle the response.
  loading: false, // A boolean indicating whether a question is currently being processed.
  setCanSendRequest: () => {},
  canSendRequest: true, // A boolean that controls whether the user is allowed to ask another question (presumably to prevent multiple requests at once).
  userEmail: "",
  setUserEmail: () => {}
});

interface ChatAskQuestion {
  request: RequestBody;
  responseSuccess: AxiosResponse<{ answer: string, additional_context?: any }>;
  responseError: AxiosError<{ error: string }>;
}

interface ChatContextProviderProps extends React.PropsWithChildren {
  persona: Persona;
}

// wraps around the ChatWrapper component in Chat.tsx file.
// This makes the context values available to all components within ChatWrapper and its descendants, such as QuestionsAndAnswers and Form.
export function ChatContextProvider({ persona, children }: ChatContextProviderProps) {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionAndAnswer[]>([]);
  const [canSendRequest, setCanSendRequest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);


  const sendRequest = useCallback(
    async (question: string) => {
      try {
        console.log("sendRequest() called with question:", question);
        
        setLoading(true);
        setCanSendRequest(false);
        setQuestionsAndAnswers(prevQuestionsAndAnswers => [
          ...prevQuestionsAndAnswers,
          { question, answer: '' },
        ]);
        console.log(`use-conversation: stored email is ${userEmail}`)

        const { data } = await axios.put<
          never,
          ChatAskQuestion['responseSuccess'],
          ChatAskQuestion['request']
        >('backend/conversations', {
          persona,
          question,
          email: userEmail,
        });

        setQuestionsAndAnswers((questionsAndAnswers) => {
          const newQuestionsAndAnswers = [...questionsAndAnswers];
          newQuestionsAndAnswers[newQuestionsAndAnswers.length - 1] = {
            ...newQuestionsAndAnswers[newQuestionsAndAnswers.length - 1],
            answer: data.answer,
            additional_context: data.additional_context,
          };
          return newQuestionsAndAnswers;
        });
      } catch (error) {
        const answer =
          error instanceof AxiosError
            ? (error as ChatAskQuestion['responseError']).response?.data
                ?.error || 'Something went wrong'
            : 'Something went wrong';

        setQuestionsAndAnswers((questionsAndAnswers) => {
          const newQuestionsAndAnswers = [...questionsAndAnswers];
          newQuestionsAndAnswers[newQuestionsAndAnswers.length - 1] = {
            ...newQuestionsAndAnswers[newQuestionsAndAnswers.length - 1],
            answer,
          };

          return newQuestionsAndAnswers;
        });
      } finally {
        setLoading(false);
      }
    },
    [questionsAndAnswers, persona, userEmail],
  );

  const resetQuestionsAndAnswers = useCallback(
    () => setQuestionsAndAnswers([]),
    [setQuestionsAndAnswers,userEmail]
  );

  return (
    <ChatContext.Provider
      value={{
        questionsAndAnswers,
        setQuestionsAndAnswers,
        resetQuestionsAndAnswers,
        sendRequest,
        loading,
        setCanSendRequest,
        canSendRequest,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </ChatContext.Provider>
  );

}

// Hook used in components within ChatWrapper and its descendants, such as QuestionsAndAnswers and Form.
// Calls useContext(ChatContext), allowing you to access the shared data directly.
// For example, in QuestionsAndAnswers, it's used to get the questionsAndAnswers array to render the conversation history.
export function useChatContext() {
  return useContext(ChatContext);
}
