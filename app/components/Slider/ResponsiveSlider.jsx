'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Styles from "./ResponsiveSlider.module.css";
import clsx from 'clsx';

export function ResponsiveSlider({
  items = [],
  renderItem,
  slidesPerViewDesktop = 2,
  slidesPerViewMobile = 1,
  gap = 16,
  showPagination = true,
  showNavigation = false,
  autoplay = true,
  className = '',
}) {
  if (!items.length || typeof renderItem !== 'function') return null;

  return (
    <div className={clsx(`${Styles["responsive-slider"]}`, className)}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={gap}
        slidesPerView={slidesPerViewMobile}
        breakpoints={{
          768: {
            slidesPerView: slidesPerViewDesktop,
          },
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={showNavigation}
        autoplay={autoplay && { delay: 3000 }}
        loop={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
