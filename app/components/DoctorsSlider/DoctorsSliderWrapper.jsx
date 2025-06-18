'use client';

import dynamic from 'next/dynamic';

const DoctorsSlider = dynamic(() => import('./DoctorsSlider'), {
  ssr: false, loading: () => <></>
});

export default function DoctorsSliderWrapper({data}) {
  return <DoctorsSlider data={data}/>;
}
