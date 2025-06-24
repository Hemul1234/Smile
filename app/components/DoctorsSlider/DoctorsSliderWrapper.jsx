'use client';

import dynamic from 'next/dynamic';

const DoctorsSlider = dynamic(() => import('./DoctorsSlider'), {
  ssr: false, loading: () => <></>
});

export default function DoctorsSliderWrapper({doctors}) {
  return <DoctorsSlider doctors={doctors}/>;
}
