import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { ServiceCard } from "@/app/components/ServiceCard/ServiceCard";
import { BookingForm } from "@/app/components/BookingForm/BookingForm"
import { extractServiceData } from "@/app/data/dataUtils";

export default async function Service({params}) {

  const { slug } = await params
  const serviceData = extractServiceData(slug);

  if (!serviceData) {
      return <div>Услуга не найдена</div>;
    }

  return (
    <main>
        <Section id="services-terapy" title="Услуги">
          <Breadcrumbs />
          <ServiceCard data={serviceData} />
        </Section>
        <Section id="make-an-appointment" title="Запись на прием">
          <BookingForm data={serviceData} />
        </Section>
    </main>
  );
}
