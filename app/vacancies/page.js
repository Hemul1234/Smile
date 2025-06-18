import Styles from "../components/VacancyCard/VacancyCard.module.css"

import { Section } from "../components/Section/Section";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Vacancy } from "../components/VacancyCard/VacancyCard"
import { vacanciesData } from "../data/vacanciesData"

export default function pageVacancies() {

  return (
    <main>
        <Section id="vacancies" title="Вакансии">
          <Breadcrumbs />
          <div className={Styles["vacancies-list"]}>
            <Vacancy data={vacanciesData}/>
          </div>
        </Section>
    </main>
  );
}
