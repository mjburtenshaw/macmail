import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
} from '@react-email/components';
import React from 'react';

const bodyStyles = {
  backgroundColor: '#ffffff',
};

const containerStyles = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1Styles = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

export const LETTER_NAME = 'TestLetter';

export const requiredProps = [];

export function TestLetter() {
  return (
    <Html>
      <Head />
      <Preview>This is a test letter</Preview>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          <Heading style={h1Styles}>Test</Heading>
        </Container>
      </Body>
    </Html>
  );
}

export default TestLetter;
