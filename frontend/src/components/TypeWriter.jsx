import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(displayedText + text[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, displayedText, speed]);

    return <div>{displayedText}</div>;
};

export default TypeWriter;