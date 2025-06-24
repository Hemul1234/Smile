import Styles from "./CardList.module.css";
import { Card } from "../Card/Card";

export function CardList({ variant, data }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <ul className={
      variant === "doctorsDesktop"
        ? Styles["doctors-desktop"]
        : Styles["services-items"]
    }>
      {safeData.map((item, index) => (
        <Card
          key={item.id || index}
          {...item}
          variant={variant}
          isFirst={variant === "doctorsDesktop" && index === 0}
        />
      ))}
    </ul>
  );
}
