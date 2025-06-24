import { Section } from "@/app/components/Section/Section";
import {  DoctorCard } from "@/app/components/DoctorCard/DoctorCard";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { BookingForm } from "@/app/components/BookingForm/BookingForm"
import { ReviewsSlider } from "@/app/components/reviewsSlider/ReviewsSlider";
import { getDoctorBySlug } from "@/app/api/api-utils";
import { getServicesByCategory } from "@/app/api/api-utils";

export default async function Doctor({params}) {

  const { slug } = await params
  const doctor = await getDoctorBySlug(slug);
  const doctorToServiceCategoryMap = {
    microscopist: ['terapy'],
    orthodontist: ['esthetic'],
    hygienist:    ['terapy'],
    therapist:    ['terapy'], 
    surgeon:      ['surgery'],
    orthopedist:  ['prosthetics'],
  }

  const category = doctorToServiceCategoryMap[doctor.category] || [];
  const services = await getServicesByCategory(category);
  if (!doctor) {
      return <div>Врач не найден</div>;
    }

  return (
    <main>
        <Section id="doctor">
          <Breadcrumbs doctor={doctor}/>
          <DoctorCard doctor={doctor} />
        </Section>
        <Section title="Отзывы">
          <ReviewsSlider />
        </Section>
        <Section id="make-an-appointment" title="Запись на прием">
          <BookingForm services={services} />
        </Section>
    </main>
  );
}
