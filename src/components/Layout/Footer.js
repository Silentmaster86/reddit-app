import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #fff;
  padding: 1rem 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  margin-top: auto;
`;

const Footer = () => {
  return <FooterWrapper>© {new Date().getFullYear()} Reddit Clone. Built with by Przemyslaw Pietkun</FooterWrapper>;
};

export default Footer;