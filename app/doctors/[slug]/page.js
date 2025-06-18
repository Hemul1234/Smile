import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { BookingForm } from "@/app/components/BookingForm/BookingForm"
import { ReviewsSlider } from "@/app/components/reviewsSlider/ReviewsSlider";
import { extractServiceData } from "@/app/data/dataUtils";

export default async function Service({params}) {

  const { slug } = await params
  const serviceData = extractServiceData(slug);

  if (!serviceData) {
      return <div>Услуга не найдена</div>;
    }

  return (
    <main>
        <Section id="doctor">
          <Breadcrumbs />
        </Section>
        <Section title="Отзывы">
          <ReviewsSlider />
        </Section>
        <Section id="make-an-appointment" title="Запись на прием">
          <BookingForm data={serviceData} />
        </Section>
    </main>
  );
}
