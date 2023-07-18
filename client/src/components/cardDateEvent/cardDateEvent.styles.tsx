import styled from "styled-components";
import { FC } from "react";

const CardDateEvent = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* align-items: center; */
  width: 40vw;
  height: 30vh;
  gap: 2px;
  margin: 3px;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.card.primary};
  color: ${(props) => props.theme.card.text};
`;
export default CardDateEvent;
