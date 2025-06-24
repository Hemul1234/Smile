
import { getDataByTypeAndCategory }from "@/app/data/dataUtils";
import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { CardList } from "@/app/components/CardList/CardList";
import { getServicesByCategory } from "@/app/api/api-utils";

export default async function CategoryPage({ params }) {
  const { category } = await params
  const services = await getServicesByCategory(category);
  return (
    <main>
        <Section id="services-terapy" title="Услуги">
          <Breadcrumbs />
          <CardList variant={'services'} data={services} />
        </Section>
    </main>
  );
}
