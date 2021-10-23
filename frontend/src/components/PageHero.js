import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = ({ link, name, link2, name2 }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {link ? <Link to={`/${link}`}>/ {name}</Link> : ''}
          <Link to={link2}>
            {name2 && "/"} {name2}
          </Link>
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #546d8f17;
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  color: hsl(22, 28%, 21%);
  a {
    font-size: 2.5rem;
    color: #000;
    padding: 0.5rem;
    transition: all 0.3s linear;
    opacity: 0.7;
  }
  a:hover {
    color: #183051;
    opacity: 1;
  }
`;

export default PageHero;