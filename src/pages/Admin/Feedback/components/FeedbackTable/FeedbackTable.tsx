import React, { FC } from "react";

// @ts-ignore
import Checkbox from "react-custom-checkbox";
import { useTable, Column } from "react-table";

import FormRow from "commons/FormRow";
import MessageForEmptyList from "commons/MessageForEmptyList";

import { FeedbackI } from "../../interface";

const FeedbackTable: FC<{
  feedback: FeedbackI[];
  selected: FeedbackI[];
  setSelected: React.Dispatch<React.SetStateAction<FeedbackI[]>>;
}> = ({ feedback, selected, setSelected }) => {
  const columns: Column<{
    _id: string;
    username: string;
    text: string;
  }>[] = React.useMemo(
    () => [
      {
        Header: "",

        accessor: "_id",
        Cell: ({ value }: { value: string }) => {
          const hasSelectedFeedback = selected
            .map((item) => item._id)
            .includes(value);

          const onChange = () => {
            // console.log("valueCheckbox", valueFromCheckbox);
            if (!hasSelectedFeedback) {
              const feedbackItem = feedback.find((item) => item._id === value);
              setSelected([...selected, feedbackItem]);
            } else {
              setSelected(selected.filter((item) => item._id !== value));
            }
          };

          return (
            <Checkbox
              checked={hasSelectedFeedback}
              borderWidth={1}
              borderRadius={0}
              size={24}
              de
              borderColor="#696cff"
              icon={
                <svg
                  style={{ position: "relative", left: "-1px" }}
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path
                    fill="#696cff"
                    d="M24 24h-24v-24h24v24zm-1-23h-22v22h22v-22zm-3 6.435l-10.005 10.565-4.995-5.866.761-.648 4.271 5.015 9.24-9.751.728.685z"
                  />
                </svg>
              }
              onChange={onChange}
            />
          );
        },
        getProps: () => ({ someFunc: () => alert("clicked") }),
      },
      {
        Header: "Имя",

        accessor: "username",
      },

      {
        Header: "Сообщение",

        accessor: "text",
      },
    ],
    [feedback, selected, setSelected]
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = useTable({ columns, data: feedback });

  const getWidthByColumn = (column: string) => {
    switch (column) {
      case "text": {
        return "200px";
      }
      case "username": {
        return "100px";
      }
      default: {
        return "auto";
      }
    }
  };

  return (
    <>
      {feedback.length === 0 && (
        <MessageForEmptyList message="Записей с обратной связью нет" />
      )}
      {feedback.length > 0 && (
        <>
          <FormRow>
            <table
              {...getTableProps()}
              style={{ border: "solid 1px #000", backgroundColor: "#fff" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        {...column.getHeaderProps({
                          style: {
                            width: getWidthByColumn(column.id),
                          },
                        })}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <tr key={row.id} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td
                            key={index.toString()}
                            style={{
                              padding: "10px",

                              border: "solid 1px #000",
                            }}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormRow>
        </>
      )}
    </>
  );
};

export default FeedbackTable;
