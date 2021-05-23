import React from 'react';
import Board from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'
import { confirmAlert }  from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PropTypes from 'prop-types';
import { Alert } from 'react-st-modal';
import axios from 'axios';
import { REACT_APP_BASE_URL, TIMEOUT_REDIRECT  } from '../../routers/router.type';

export const BoardTrello = ({dataStart, dataDoing, dataExprired, dataComplete, dataLose, setLoading, input }) => {
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
    const deleteIssue = async (id) => {
      console.log(id);
      try {
        const response = await axios.delete(`${REACT_APP_BASE_URL}issues/${id}`)
        console.log('response delete',response);
        if (response.status === 200) {
          setLoading(false);
          setTimeout(() => {
            Alert("Delete Issue Success", "Notification");
          }, TIMEOUT_REDIRECT);
        }
      } catch (error) {
        Alert("Delete Issue Fail","Notification")
      }
    }
    const UpdateIssue = async (data) => {
      console.log(data)
      try {
        const response = await axios.put(`${REACT_APP_BASE_URL}issues/${data.id}`, data)
        if (response.status === 200) {
          setLoading(false);
          setTimeout(() => {
            Alert("Update Issue Success", "Notification");
          }, TIMEOUT_REDIRECT);
        }
      } catch (error) {
        console.log(error);
        Alert("Update Issue Faild", "Notification")
      }
    }
    const AddIssue = async (data) => {
      console.log(data);
      try {
        const response = await axios.post(`${REACT_APP_BASE_URL}issues`, data)
        if (response.status === 200) {
          setLoading(false);
          setTimeout(() => {
            Alert("Add Issue Success", "Notification");
          }, TIMEOUT_REDIRECT);
        }
      } catch (error) {
        Alert('Add Issue Faild', "Notification")
      }
    }
    return(
        <Board
        allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={ (board, column, card) => {
          confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this.',
            buttons: [
              {
                label: 'confirm',
                onClick: deleteIssue(card.data.id)
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
        onCardNew={(board, column, card) => {
          const DataAdd = {
            name: card.title,
            description: card.description,
            status: column.id,
            projectId: parseInt(input)
          }
          AddIssue(DataAdd)
        }}
        onCardDragEnd={(board, card, source, destination) => {
          let DataChange = {
            id: card.data.id,
            name: card.data.name,
            description: card.data.description,
            status: destination.toColumnId
          }
          UpdateIssue(DataChange)
        }}
        />
    )
}
BoardTrello.propTypes = {
    dataStart: PropTypes.array.isRequired,
    dataDoing: PropTypes.array.isRequired,
    dataExprired: PropTypes.array.isRequired,
    dataComplete: PropTypes.array.isRequired,
    dataLose: PropTypes.array.isRequired,
    setLoading: PropTypes.func.isRequired,
    input: PropTypes.number.isRequired
}