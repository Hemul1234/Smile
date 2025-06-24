import { Section } from "../components/Section/Section";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs"
import DoctorsPage from "../components/DoctorsSwitch/DoctorsPage.client";
import { getAllDoctors } from "../api/api-utils";

export default async function Doctors({ params }) {
  const doctors = await getAllDoctors();
  if (!doctors || doctors.length === 0) {
    return <div>Врачи не найдены</div>;
  }
  const { category } = await params
  return (
    <main>
        <Section id="doctors" title="Врачи">
          <Breadcrumbs />
          <DoctorsPage data={doctors} />
        </Section>
    </main>
  );
}
