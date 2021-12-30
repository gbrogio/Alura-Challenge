import React, { useEffect, useState } from 'react';
import { Container } from 'styles/components/TextEditor';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { EditorProps } from 'types';

const TextEditor: React.FC<EditorProps> = ({
  color,
  language,
  disabled,
  childrenTextData,
}) => {
  const [childrenText, setChildrenText] = useState('');

  const getTextContent = () => {
    const textDefault = document.getElementById('textContent') as HTMLTextAreaElement;
    return textDefault;
  };

  useEffect(() => {
    const textDefault = getTextContent();
    const textHighlight = document.querySelector('pre[style]');
    if (textHighlight.lastChild.nodeName === 'DIV') {
      textHighlight.lastChild.remove();
    }

    if (disabled) {
      setChildrenText(childrenTextData);
    }

    textDefault?.addEventListener('scroll', () => {
      const { scrollTop } = textDefault;

      textHighlight.scroll(0, scrollTop);
    });
  });
  useEffect(() => {
    const textDefault = getTextContent();

    setTimeout(() => {
      if (disabled) {
        setChildrenText(childrenTextData);
      } else {
        setChildrenText(textDefault.value);
      }
    }, 1000);
  }, []);

  return (
    <Container
      language={language}
      disabled={disabled}
      style={{ backgroundColor: color }}
      color={color}
      id="codeContainer"
    >
      <span className="macIcons" />
      <span className="background" />
      <div>
        {!disabled && (
          <textarea
            id="textContent"
            onChange={(e) => setChildrenText(e.currentTarget.value)}
            onKeyDown={(e) => {
              const thisElement = e.currentTarget;
              if (e.keyCode === 9 || e.which === 9) {
                e.preventDefault();
                const sStart = thisElement.selectionStart;
                const sEnd = thisElement.selectionEnd;
                const substringValues = {
                  start: thisElement.value.substring(0, sStart),
                  end: thisElement.value.substring(sEnd),
                };

                thisElement.value = `${substringValues.start}   ${substringValues.end}`;
                thisElement.selectionEnd = sStart + 3;
                setChildrenText(thisElement.value);
              }
            }}
            required
          />
        )}

        <SyntaxHighlighter
          wrapLines
          wrapLongLines
          language={language}
          style={atomOneDark}
        >
          {childrenText}
        </SyntaxHighlighter>
      </div>
    </Container>
  );
};

export default TextEditor;
