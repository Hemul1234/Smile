import Styles from "./CardList.module.css"

import { Card } from "../Card/Card"

export function CardList ({variant, data}) {
    return (
        <ul className={`${variant==="doctorsDesktop" ? Styles["doctors-desktop"] : Styles["services-items"] }`}>
            {data.map((item, index) =>(
                <Card 
                key={item.id} 
                {...item} 
                variant={variant}
                isFirst = {variant === "doctorsDesktop" && index === 0}/>
            ))}
        </ul>
    );
}