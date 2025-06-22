import { FirstBlock } from "./components/FirstBlock/FirstBlock";
import { Section } from "./components/Section/Section";
import DoctorsSliderWrapper from "./components/DoctorsSlider/DoctorsSliderWrapper";
import { OnlineCalculation } from "./components/OnlineCalculation/OnlineCalculation";
import { ReviewsSlider } from "./components/reviewsSlider/ReviewsSlider";
import { SignUpBunner } from "./components/SignUpBunner/SignUpBunnerComponent";
import { Contacts } from "./components/Contacts/Contacts";
import { CardList } from "./components/CardList/CardList";
import { TeethFragment } from "./components/OnlineCalculation/TeethFragment";
import { SymptomsFragment } from "./components/OnlineCalculation/SymptomsFragment";
import { symptomsData } from "./data/symptomsData";
import { useServicesByCategory } from "./api/api-hooks";

import { getDataByTypeAndCategory } from "./data/dataUtils";

const { data: services, isLoading: servicesLoading, error: servicesError } = useServicesByCategory('promo');

export default function Home() {

  return (
    <main>
        <FirstBlock title="Проверьте здоровье"/>
        <Section id="services" title="Услуги">
          <CardList variant={'services'} data={services} />
        </Section>
        <Section id="doctors" title="Врачи">
          <DoctorsSliderWrapper data={getDataByTypeAndCategory('doctors')}/>
        </Section>
        <Section align="center" title="Онлайн расчет стоимости лечения зубов">
          <OnlineCalculation>
            <TeethFragment />
            <SymptomsFragment items={symptomsData} />
          </OnlineCalculation>
        </Section>
        <Section title="Отзывы">
          <ReviewsSlider />
        </Section>
        <Section display="none">
          <SignUpBunner />
        </Section>
        <Section title="Контакты">
          <Contacts />
        </Section>
    </main>
  );
}
