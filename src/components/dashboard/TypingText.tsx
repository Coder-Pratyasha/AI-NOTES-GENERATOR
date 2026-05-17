"use client";

import {
  useEffect,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TypingTextProps = {
  text: string;
};

const TypingText = ({
  text,
}: TypingTextProps) => {

  const [displayedText,
    setDisplayedText] =
    useState("");

  useEffect(() => {

    let index = 0;

    const interval = setInterval(() => {

      setDisplayedText(
        text.slice(0, index)
      );

      index++;

      if (index > text.length) {
        clearInterval(interval);
      }

    }, 8);

    return () =>
      clearInterval(interval);

  }, [text]);

  return (

    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
    >
      {displayedText}
    </ReactMarkdown>

  );
};

export default TypingText;