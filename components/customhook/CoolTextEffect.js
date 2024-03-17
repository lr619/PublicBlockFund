import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const Content = styled.div`
  color: white;
  font-weight: bold;
  font-decoration: none;
  font-size: 4rem;
`;

const CoolTextEffect = () => {
  // List of fonts (ensure they are imported or available in your project)
  const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Verdana'];
  // State to keep track of the current font
  const [currentFont, setCurrentFont] = useState(fonts[0]);

  useEffect(() => {
    // Function to cycle through the fonts
    const changeFont = () => {
      setCurrentFont((prevFont) => {
        const currentIndex = fonts.indexOf(prevFont);
        const nextIndex = (currentIndex + 1) % fonts.length;
        return fonts[nextIndex];
      });
    };

    // Set an interval to change the font every 3 seconds
    const fontInterval = setInterval(changeFont, 800);

    // Cleanup interval on component unmount
    return () => clearInterval(fontInterval);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Content style={{ fontFamily: currentFont }}>
Welcome to {"BlockFund"}    </Content>
  );
};
export default CoolTextEffect;
