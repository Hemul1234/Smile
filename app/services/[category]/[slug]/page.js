import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { ServiceCard } from "@/app/components/ServiceCard/ServiceCard";
import { BookingForm } from "@/app/components/BookingForm/BookingForm"
import { getAllServices, getServiceBySlug } from "@/app/api/api-utils";

export default async function Service({params}) {

  const { slug } = await params
 
  const service = await getServiceBySlug(slug);
  const services = await getAllServices();
  
  if (!service) {
      return <div>Услуга не найдена</div>;
    }

  return (
    <main>
        <Section id="services-terapy" title="Услуги">
          <Breadcrumbs service={service} />
          <ServiceCard service={service} />
        </Section>
        <Section id="make-an-appointment" title="Запись на прием">
          <BookingForm services={services} />
        </Section>
    </main>
  );
}
