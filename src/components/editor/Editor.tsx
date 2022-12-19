import React from 'react';

import Highlight, { defaultProps } from 'prism-react-renderer';

interface EditorProps {
  language?: any;
  children?: any;
}

export const Editor = ({ language, children }: EditorProps) => {
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {/* TODO: */}
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({ line, key: index });
            // if (shouldHighlightLine(index)) {
            //   lineProps.className = `${lineProps.className} highlight-line`;
            // }
            return (
              <div key={index} {...lineProps}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
