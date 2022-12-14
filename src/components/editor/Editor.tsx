import React from 'react';

import Highlight, { defaultProps } from 'prism-react-renderer';

interface EditorProps {
  language: any;
  children: any;
}

export const Editor = ({ language, children }: EditorProps) => {
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {/* TODO: */}
    </Highlight>
  );
};
