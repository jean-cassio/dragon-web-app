import styles from "./Textarea.module.css";

const Textarea = ({
  id,
  placeholder = "",
  maxWidth = "100%",
  minHeight = "200px",
  label = "",
  ...rest
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ "--max-width": maxWidth, "--min-height": minHeight }}
    >
      <textarea
        id={id}
        className={styles.input}
        placeholder={placeholder}
        {...rest}
      />

      {!!label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Textarea;
