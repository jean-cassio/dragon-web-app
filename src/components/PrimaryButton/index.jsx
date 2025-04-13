import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({
  children,
  maxWidth = "fit-content",
  borderColor = "var(--light-green)",
  borderHoverColor = "var(--yellow)",
  bgColor = "var(--light-green)",
  color = "#fff",
  ...rest
}) => {
  return (
    <button
      className={styles.button}
      style={{
        "--max-width": maxWidth,
        "--border-color": borderColor,
        "--border-hover-color": borderHoverColor,
        "--bg-color": bgColor,
        "--color": color,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
