import { useEffect, useState } from "react";
import styled from "styled-components"

export default function Transactions(props){
    const {date, description, type, value} = props.transaction;
    let valor = Number(value).toFixed(2);
    valor = valor.replace(".",",");
    return (
        <ListItemContainer>
        <div>
          <span>{date}</span>
          <strong data-test = "registry-name">{description}</strong>
        </div>
        <Value data-test = "registry-amount" color={`${type}`}>{valor}</Value>
      </ListItemContainer>
    )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;