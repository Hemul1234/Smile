import { Section } from "../components/Section/Section";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs"
import DoctorsPage from "../components/DoctorsSwitch/DoctorsPage.client";

export default async function Doctors({ params }) {
  const { category } = await params
  return (
    <main>
        <Section id="doctors" title="Врачи">
          <Breadcrumbs />
          <DoctorsPage />
        </Section>
    </main>
  );
}
