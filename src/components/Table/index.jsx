import styles from "./Table.module.css";

const Table = ({
  maxWidth = "500px",
  columns = [],
  data = [],
  renderCell = (value) => value,
}) => {
  return (
    <table className={styles.table} style={{ "--max-width": maxWidth }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th className={styles.th} key={col.key}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td className={styles.td} key={col.key}>
                {renderCell(row[col.key], col.key, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
