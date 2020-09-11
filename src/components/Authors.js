import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedOption.label, setBornTo: parseInt(born, 10) },
    });

    setBorn("");
  };

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return null;
  }

  const authors = result.data.allAuthors;

  const options = authors.map((el) => {
    return { value: el.name, label: el.name };
  });

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCountOfAuthor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          <div>
            name
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </>
  );
};
//dd

export default Authors;
