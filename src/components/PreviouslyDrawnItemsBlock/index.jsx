import React from "react";
import { Card, Table } from "tabler-react";
import "./style.css";

const PreviouslyDrawnItemsBlock = props => (
  <Card
    title="Vencedor"
    className="past-drawn-block"
    body={
      <Table>
        <Table.Body className="past-drawn-item">
          {props.pastDrawnItems.length === 0
            ? ""
            : props.pastDrawnItems.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Col ><h1>{item}</h1></Table.Col>
                </Table.Row>
              ))}
        </Table.Body>
      </Table>
    }
  />
);

export default PreviouslyDrawnItemsBlock;
