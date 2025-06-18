'use client';

import Styles from "./ReviewsSlider.module.css";

import { ResponsiveSlider } from '../Slider/ResponsiveSlider';
import { reviews } from '@/app/data/reviewsData';

export function ReviewsSlider() {
  return (
    <ResponsiveSlider
        items={reviews}
        renderItem={(review) => (
            <div className={Styles["reviews-slide"]}>
                <div className={Styles["reviews-slide-img"]} style={{ background: `url(${review.photo}) center/cover`}}></div>
                <div className={Styles["reviews-slide-name"]}>
                    <p className={Styles["reviews-slide-text-name"]}>{review.name}</p>
                    <p className={Styles["reviews-slide-text-service"]}>{review.service}</p>
                </div>
                <div className={Styles["reviews-slide-text"]}>
                    {review.text}
                </div>
            </div>
        )}
        slidesPerViewDesktop={2}
        slidesPerViewMobile={1}
        gap={16}
    />
  );
}