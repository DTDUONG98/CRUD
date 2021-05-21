import React from 'react';
import Board from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'
import { confirmAlert }  from 'react-confirm-alert';
import PropTypes from 'prop-types';

export const BoardTrello = ({dataStart, dataDoing, dataExprired, dataComplete, dataLose }) => {
    console.log('data', dataStart, dataDoing, dataExprired, dataComplete, dataLose);

    const board = {
        columns: [
          {
            id: "start",
            title: "Start",
            cards: dataStart
          },
          {
            id: "doing",
            title: 'Doing',
            cards: dataDoing
          },
          {
            id: "exprired",
            title: 'Exprired',
            cards: dataExprired
          },
          {
            id: "complete",
            title: 'Complete',
            cards: dataComplete
          },
          {
            id: "lose",
            title: 'Lose',
            cards: dataLose
          }
        ]
      }

    return(
        <Board
        allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={ (board, column, card) => {
          console.log('Remove Card', card)
          
          confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
              {
                label: 'confirm',
                onClick: () => {
                  console.log( card.data.id)
                  this.deleteMarketing(card.data.id)
                }
              },
              {
                label: 'cancel',
                onClick: () => {}
              }
            ]
          });
        }}
        onLaneRename={console.log}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={console.log}
        onCardDragEnd={(board, card, source, destination) => {
        }}
        />
    )
}
BoardTrello.propTypes = {
    dataStart: PropTypes.array.isRequired,
    dataDoing: PropTypes.array.isRequired,
    dataExprired: PropTypes.array.isRequired,
    dataComplete: PropTypes.array.isRequired,
    dataLose: PropTypes.array.isRequired
}