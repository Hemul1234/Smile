import { FirstBlock } from "./components/FirstBlock/FirstBlock";
import { Section } from "./components/Section/Section";
import DoctorsSliderWrapper from "./components/DoctorsSlider/DoctorsSliderWrapper";
import { OnlineCalculation } from "./components/OnlineCalculation/OnlineCalculation";
import { ReviewsSlider } from "./components/reviewsSlider/ReviewsSlider";
import { SignUpBunner } from "./components/SignUpBunner/SignUpBunnerComponent";
import { Contacts } from "./components/Contacts/Contacts";
import { CardList } from "./components/CardList/CardList";
import { TeethMap } from "./components/OnlineCalculation/TeethFragment";
import { SymptomsFragment } from "./components/OnlineCalculation/SymptomsFragment";
import { getServicesByCategory, getAllDoctors, getAllSymptoms, getDoctorBySlug } from "./api/api-utils";

export default async function Home() {
  const services = await getServicesByCategory('promo');
  const doctors = await getAllDoctors();
  const doctorForFirst = await getDoctorBySlug('aleksej-ivanovich-smirnov');
  const symptoms = await getAllSymptoms();
  return (
    <main>
        <FirstBlock title="Проверьте здоровье" doctor={doctorForFirst}/>
        <Section id="services" title="Услуги">
          <CardList variant={'services'} data={services} />
        </Section>
        <Section id="doctors" title="Врачи">
          <DoctorsSliderWrapper doctors={doctors}/>
        </Section>
        <Section align="center" title="Онлайн расчет стоимости лечения зубов">
          <OnlineCalculation>
            <TeethMap />
            <SymptomsFragment items={symptoms} />
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
