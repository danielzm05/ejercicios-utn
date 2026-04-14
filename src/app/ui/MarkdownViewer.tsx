import ReactMarkdown from 'react-markdown';

export const MarkdownViewer = ({ content }: { content: string }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};
