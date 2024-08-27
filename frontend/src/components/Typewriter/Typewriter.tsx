import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BsFiletypePdf } from "react-icons/bs";

interface TypewriterProps {
  content: string;
  delay: number;
  onEnd?: () => void;
}

const parseNextWord = (content:string, startIndex:number) => {
  let result = '';
  let i = startIndex;

  while (i < content.length && content[i] === ' ') {
    i++;
  }

  let wordEnd = i;
  while (wordEnd < content.length && content[wordEnd] !== ' ') {
    wordEnd++;
  }

  result = content.substring(i, wordEnd); 

  return { content: result, newIndex: wordEnd };
};

const linkRenderer = (props:any) => {
  return (
    <a href={props.href} >
      <span className="pdf-chip"> 
        {props.children} 
        <BsFiletypePdf style={{ width: '16px', height: '16px' }} />
      </span>
    </a>
  );
}

export function Typewriter({ content, delay, onEnd }: TypewriterProps) {
  const [renderedContent, setRenderedContent] = useState('');

  useEffect(() => {
    if (!content.length) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index < content.length) {
        const nextWord = parseNextWord(content, index); 
        setRenderedContent((prevContent) => prevContent + ' ' + nextWord.content); // Add a space
        index = nextWord.newIndex; 
      } else {
        clearInterval(interval);
        onEnd?.();
      }
    }, delay); // Adjust the delay as needed

    return () => clearInterval(interval);
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ReactMarkdown
      className="font-fe-lexend-maxi font-[300] text-neutral-dark-1 whitespace-pre-wrap w-full max-w-full"
      remarkPlugins={[remarkGfm]}
      components={{
        link: linkRenderer  // Use our custom link renderer
      }}
    >
      {renderedContent}
    </ReactMarkdown>
  );
}

// import { useEffect, useState } from 'react';

// interface TypewriterProps {
//   content: string;
//   onEnd?: () => void;
// }

// export function Typewriter({ content, onEnd }: TypewriterProps) {
//   const [renderedContent, setRenderedContent] = useState('');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index >= content.length) {
//       onEnd?.(); 
//       return;
//     }
  
//     const interval = setInterval(() => {
//       const nextChunk = parseNextChunk(content, index);
//       setRenderedContent(nextChunk.content);
//       setIndex(nextChunk.newIndex);
//     }, 5);
  
//     console.log('renderedContent:', renderedContent);
//     console.log('index:', index);
  
//     return () => clearInterval(interval);
//   }, [content, index]); 

//   const parseNextChunk = (content: any, startIndex: any) => {
//     let result = ''; 
//     let i = startIndex;

//     while (i < content.length) {
//       if (content[i] === '<') { 
//         const tagEnd = content.indexOf('>', i);
//         result += content.substring(i, tagEnd + 1); 
//         i = tagEnd + 1;
//       } else if (content[i] === '\n') {
//         result += '<br/>';
//         i++;
//       } else {
//         result += content[i]; 
//         i++;
//       }
//     }

//     console.log('result:', result);
//     console.log('i:', i);

//     return { content: result, newIndex: i };
//   }

//   return <div>{renderedContent}</div>; ;
// }