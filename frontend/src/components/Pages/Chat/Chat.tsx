"use client";

import { useEffect, useState} from 'react';
import { MdOutlineForum, MdOutlineCloudUpload } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import { Menu } from '@/components/Menu';
import { Persona } from '@/app/api/backend/conversations/route.schema';
import { ChatContextProvider, useChatContext } from './ChatContext';
// import { RenderChatMessages } from './RenderChatMessages';
import { Modal } from '@/components/Modal';
import { useChat } from "ai/react";
import { axios } from '@/axios';
import { Paragraph } from '@/components/Paragraph';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle, Bar, BarChart } from 'recharts';




export function ChatWrapper({ userEmail, API_ENDPOINT }: { userEmail: string; API_ENDPOINT:string}) {
  const { sendRequest, canSendRequest, loading, setUserEmail } = useChatContext();
  const searchParams = useSearchParams();
  const data = [
    {
      name: '2024-02-01',
      average_price: 3842.41164	,
      max_ask_price: 3859.0
    },
    {
      name: '2024-02-02',
      average_price: 3875.76431,
      max_ask_price: 3900.0
    },
    {
      name: '2024-02-05',
      average_price: 3903.65039	,
      max_ask_price: 3930.0
    },
    {
      name: '2024-02-06',
      average_price: 3948.53397	,
      max_ask_price: 3972.0
    },
    {
      name: '2024-02-07',
      average_price: 3918.49477,
      max_ask_price: 3958.0
    },
    {
      name: '2024-02-08',
      average_price: 4029.43727,
      max_ask_price: 4065.0,
    },
    {
      name: '2024-02-09',
      average_price: 4004.70091,
      max_ask_price: 4027.5
    },
    {
      name: '2024-02-12',
      average_price: 3989.73173	,
      max_ask_price: 4012.5
    },
    {
      name: '2024-02-13',
      average_price: 3991.74225,
      max_ask_price: 4013.5
    },
    {
      name: '2024-02-14',
      average_price: 4011.09917,
      max_ask_price: 4026.5,
    },
  ];

  

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    console.log(`pages/chat.tsx: useEffect hook1 - storedEmail is ${storedEmail}`)
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (searchParams.has('question')) {

      if (userEmail) { // Wait for userEmail to be set
        console.log(`pages/chat.tsx: useEffect hook3 - storedEmail is ${userEmail}`)
        sendRequest(searchParams.get('question')!);
      }
    }
  }, [userEmail,searchParams, sendRequest]);

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }
  
  console.log(` base endpoint ${API_ENDPOINT}`)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: API_ENDPOINT,
    keepLastMessageOnError: false,
    onError(error) {
      console.log(`an error occured:${error}`)
    },

    onFinish: (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
  },
    streamProtocol: 'text',
  });
  const [loadChart, setIsChartVisible] = useState(false);
  
  const toggleChartlVisibility = () => {
    setIsChartVisible(!loadChart);
  
    reset()
  };

  function render_chat(){
    return <img src={'/images/simulation.png'}  style={{ width: '1200', height:'450'}}/>


  //   return  <React.Fragment >
  //   <LineChart 
  //     width={1200}
  //     height={450}
  //     data={data}
  //     margin={{
  //       top: 5,
  //       right: 30,
  //       left: 20,
  //       bottom: 5,
  //     }}
  //   >
  //     <CartesianGrid strokeDasharray="3 3" />
  //     <XAxis dataKey="name" />
  //     <YAxis  />
  //     <Tooltip />
  //     <Legend />
  //     <Line type="monotone" dataKey="average_price" stroke="#3ca2b3"  />
  //     {/* <Bar  dataKey="max_ask_price"  fill="#7a9456" stroke="7a9456" /> */}
  //     </LineChart>
  // </React.Fragment>
  }

  return (
        <div className="flex flex-col gap-8">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col-reverse h-screen-vh">
          <div className="flex flex-col gap-2 ">
            {messages.map(message => (
              <div key={message.id} className="flex flex-row gap-2">
                {message.role =="user" && (
                <div className="flex flex-col gap-8">
                
                <Paragraph bold>{message.content}</Paragraph>
                </div>
                )}
                {message.role == "assistant"  && (
                <div className="answer-container">
                <ReactMarkdown
                  className="font-fe-lexend-maxi font-[300] text-neutral-dark-1 whitespace-pre-wrap w-full max-w-full"
                  remarkPlugins={[remarkGfm]}
                  >
                  {message.content.split('<chart>')[0]}
                  </ReactMarkdown>
                <>
                <br></br>
                {loadChart && message.role == "assistant" && message.content.includes("<chart>") &&(
                 <div id="graph" key={seed} className="graph-container" style={{ display: loadChart ? 'block' : 'none' }}>
                  {render_chat()}
                  </div>  
                )}
                  <br></br>
                  {message.role == "assistant"  && message.content.includes("<chart>") &&  (
                  <button onClick={toggleChartlVisibility} className="sql-button" >
                    {loadChart ? "Hide Graph" : "Show Graph"}
                  </button>     
                  )}
                  </> 
                  </div>
                )}   
              </div>
             
            ))}
          {isLoading && (
              <div className="loading-container">
                 <img className='w-12 h-12 loading-spinner' src={'images/googledots.gif'}/><p className="loading-text">Generating response...</p>
              </div>
            )}
             </div>
          </div>
        <div className="flex flex-col sticky bottom-0 overflow-hidden" style={{width: 'calc(100%)', height: '90px', background: '#fff', maxWidth: '100dvw', padding:'20px 0 0 0'}}>
          <div className='flex flex-row justify-center items-center'>  
          <form
          onSubmit={handleSubmit}
          className={twMerge(
            clsx(
              'flex flex-1 flex-grow items-center px-3 py-2 border border-neutral-dark-4 prompt-form',
            ),
          )}>
          <input
            value={input}
            placeholder="Enter your Prompt here"
            onChange={handleInputChange}
            className={twMerge(
              clsx(
                'flex font-fe-lexend-maxi flex-grow font-[300] focus:outline-none bg-transparent disabled:bg-transparent',
              ),
            )}
            disabled={isLoading}
          />
          </form>
          </div>
        </div>
  </div>
  );
}

export function Chat({ userEmail, API_ENDPOINT}: { userEmail: string ; API_ENDPOINT:string}) {

  // Pass setShowModal as a prop to ChatWrapper
  const [showModal, setShowModal] = useState(false); // State for the modal
  
  if (typeof localStorage !== 'undefined' && userEmail) {
    localStorage.setItem('user_email', userEmail); 
    console.log(`stored user_email ${userEmail} to localStorage`)
  }
  
  const clearChat = async () => {
    try {
      const storedEmail = localStorage.getItem('user_email');
      console.log(`Chat() handleRestartChat!!! - attempting to restart chat for user ${storedEmail}`)
      const response = await axios.put('backend/restartchat', {email: storedEmail});
      console.log(`Chat() handleRestartChat - handleRestartChat response:, ${response.data}`);
      window.location.reload()
    } catch (error) {
      console.error("Chat() handleRestartChat - restarting chat:", error);
    }
  };


  return (
    <ChatContextProvider persona={Persona.ama}>
      <div className="h-screen flex flex-col" style={{ background: '#f2f2f2' }}>
        <Menu />
        <div className="flex flex-grow h-screen">
          <div className="w-1/5 p-8 border-gray-100"  style={{ background: '#f2f2f2', position: 'relative'}}>
            <div className="flex flex-col pb-8">
              <div className="flex justify-center" style={{ margin: '0 0 30px 0'}}>
                <img src={'/images/wsy-logo.png'}  style={{ width: '85%'}}/>
                {/* <MdOutlineForum style={{ fill: '#4186f5' }} size={100} /> */}
              </div>
              <div className="mb-10">
              <h1 className="text-4xl font-bold flex justify-center center-align" style={{ color: '#4d4d4d', margin: '0 0 20px 0' }}>Quant Yoda</h1>
              </div>
              <h2 className="text-xl font-bold center-align" style={{ color: '#4d4d4d', margin: '0 0 40px 0' }}>Gemini Powered Quant Experience</h2>
              {/* <button onClick={() => setShowModal(true)} className="font-bold font-bold py-2 px-4 rounded button-start">
                Start Here 
              </button> */}
              <button onClick={clearChat} className="font-bold py-2 px-4 rounded button-clear">
                Clear Chat
              </button> 
              <div className="bottom-logo-wrap">
                <img src={'/images/cloud-logo.png'}  style={{  margin: '0 20px 0 0'}}/>
                <img src={'/images/Google_Gemini_logo.svg'}  />
              </div>
            </div>
            
          </div>
          <div className="w-4/5 border-gray-200 content-wrapper">
            <div>
              <ChatWrapper userEmail={userEmail} API_ENDPOINT={API_ENDPOINT} /> 
                     {/* Modal component */}
              <Modal show={showModal} onClose={() => setShowModal(false)}/>
            </div>
          </div>
        </div>
      </div>
    </ChatContextProvider>
  );
}