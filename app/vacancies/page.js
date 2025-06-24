import Styles from "../components/VacancyCard/VacancyCard.module.css"

import { Section } from "../components/Section/Section";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Vacancy } from "../components/VacancyCard/VacancyCard"
import { getAllVacancies } from "@/app/api/api-utils";

export default async function pageVacancies() {
const vacancies = await getAllVacancies();
  return (
    <main>
        <Section id="vacancies" title="Вакансии">
          <Breadcrumbs />
          <div className={Styles["vacancies-list"]}>
            <Vacancy data={vacancies}/>
          </div>
        </Section>
    </main>
  );
}
