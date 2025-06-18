
import { getDataByTypeAndCategory }from "@/app/data/dataUtils";
import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { CardList } from "@/app/components/CardList/CardList";

export default async function CategoryPage({ params }) {
  const { category } = await params
  return (
    <main>
        <Section id="services-terapy" title="Услуги">
          <Breadcrumbs />
          <CardList variant={'services'} data={ getDataByTypeAndCategory('services', `${category}`)} />
        </Section>
    </main>
  );
}
