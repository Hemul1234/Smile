import Styles from "./legal-information.module.css"

import { Section } from "../components/Section/Section";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Vacancy } from "../components/VacancyCard/VacancyCard"

export default function pageLegal() {

  return (
    <main>
        <Section id="legal-information" title="Юридическая информация">
          <Breadcrumbs />
            <div className={Styles["card"]}>
                <p className={Styles["card-title"]}>
                    Уважаемые пациенты, при посещении нашей клиники необходимо иметь при себе:
                </p>
                <div className={Styles["item"]}>
                    <p className={Styles["item-name"]}>Паспорт</p>
                    <p className={Styles["item-text"]}>Для заключения договора.</p>
                    <p className={Styles["item-text"]}>Для получения результатов обследований и других медицинских документов.</p>
                </div>
                <div className={Styles["item"]}>
                    <p className={Styles["item-name"]}>Свидетельство о рождении ребенка</p>
                    <p className={Styles["item-text"]}>Если вы обращается за оказанием медицинской помощи для вашего ребенка (до 15 лет).</p>
                </div>
                <div className={Styles["item"]}>
                    <p className={Styles["item-name"]}>Результаты обследований</p>
                    <p className={Styles["item-text"]}>Если у вас есть снимки, заключения других врачей, результаты анализов и т.п., такая информация может ускорить обследование.</p>
                </div>
            </div>
            <div className={Styles["card"]}>
                <p className={Styles["card-title"]}>
                    Перед приемом администратор попросит вас ознакомиться, заполнить и подписать следующие документы:
                </p>
                <p className={Styles["item-text"]}>
                    <span className={Styles["item-text-span"]}>Уведомление</span> о том, что несоблюдение указаний (рекомендаций) «Исполнителя» (медицинского работника, предоставляющего платную медицинскую услугу), в том числе назначенного режима лечения, могут снизить качество предоставляемой платной медицинской услуги, повлечь за собой невозможность ее завершения в срок или отрицательно сказаться на состоянии Вашего здоровья.
                </p>
                <p className={Styles["item-text"]}>
                    <span className={Styles["item-text-span"]}>Информирование</span> о возможности получения медицинской помощи в рамках программы государственных гарантий бесплатного оказания гражданам медицинской помощи и территориальных программ государственных гарантий бесплатного оказания гражданам медицинской помощи, на основании Федеральный закон от 21.11.2011 N 323-ФЗ "Об основах охраны здоровья граждан в Российской Федерации", Федеральный закон от 06.10.2003 N 131-ФЗ "Об общих принципах организации местного самоуправления в Российской Федерации"
                </p>
                <p className={Styles["item-text"]}>
                    <span className={Styles["item-text-span"]}>Согласие</span> на обработку персональных данных.
                </p>
                <p className={Styles["item-text"]}>
                    <span className={Styles["item-text-span"]}>Разрешение</span> разглашения сведений, составляющих врачебную тайну в соответствии с требованиями статьи 13 Федерального закон от 21.11.2011 N 323-ФЗ "Об основах охраны здоровья граждан в Российской Федерации", необходимо указать лицо которому вы разрешаете получение сведений, составляющих врачебную тайну, о факте вашего обращения за медицинской помощью, состоянии вашего здоровья, диагнозе заболевания, иные сведения, полученные при вашем обследовании и лечении.
                </p>
                <p className={Styles["item-name"]}>Договор на оказание медицинских услуг.</p>
                <div className={Styles["item"]}>
                    <p className={Styles["item-name"]}>Согласие на перечень медицинских вмешательств (согласно приказа Минздрава РФ).</p>
                    <p className={Styles["item-text"]}>Согласно действующему законодательству, пациент при обращении в медицинскую организацию подписывает согласие на перечень медицинских вмешательств, утвержденный приказом Минздрава РФ №390н.</p>
                </div>
                <div className={Styles["item"]}>
                    <p className={Styles["item-name"]}>Информированное добровольное согласие на медицинское вмешательство.</p>
                    <p className={Styles["item-text"]}>Этот документ вам будет предложен для ознакомления и подписания перед отдельными медицинскими вмешательствами. В случае отказа от подписания этого документа клиника вправе отказать пациенту в оказании медицинской услуги.</p>
                </div>
                <p className={Styles["item-text"]}>
                    <span className={Styles["item-text-span"]}>Анкета</span> о состоянии вашего здоровья.
                </p>
            </div>
        </Section>
        <Section id="details" title="Реквизиты">
            <div className={Styles["card"]}>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Наименование предприятия:</p>
                    <p className={Styles["item-text"]}>Общество с ограниченной ответственностью «Стоматологическая клиника Улыбка»</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Руководитель:</p>
                    <p className={Styles["item-text"]}>Генеральный директор Мещерякова Юлия Александровна</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Юридический адрес:</p>
                    <p className={Styles["item-text"]}>660049, Красноярск, ул. Матросова 4</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Фактический адрес:</p>
                    <p className={Styles["item-text"]}>660049, Красноярск, ул. Матросова 4</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Почтовый адрес:</p>
                    <p className={Styles["item-text"]}>660049, Красноярск, ул. Матросова 4</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>ИНН:</p>
                    <p className={Styles["item-text"]}>2443047805</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>КПП:</p>
                    <p className={Styles["item-text"]}>246601001</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>ОГРН:</p>
                    <p className={Styles["item-text"]}>1162468096108 от 06.08.2018 года, выдано Инспекцией Федеральной налоговой службы по Центральному району г. Красноярска.</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Полное наименование банка:</p>
                    <p className={Styles["item-text"]}>КРАСНОЯРСКОЕ ОТДЕЛЕНИЕ №8646 ПАО СБЕРБАНК Г. КРАСНОЯРСК</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Расчетный счет:</p>
                    <p className={Styles["item-text"]}>40702810531000016867</p>
                </div>
                <div className={Styles["details"]}>
                    <p className={Styles["details-name"]}>Корреспондентский счет:</p>
                    <p className={Styles["item-text"]}>30101810800000000627</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>БИК:</p>
                    <p className={Styles["item-text"]}>040407627</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>ИНН:</p>
                    <p className={Styles["item-text"]}>2540016961</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>ОКПО:</p>
                    <p className={Styles["item-text"]}>60346638</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>КПП:</p>
                    <p className={Styles["item-text"]}>246643001</p>
                </div>
                <div className={`${Styles["details"]} ${Styles["details-row"]}`}>
                    <p className={Styles["details-name"]}>ОГРН:</p>
                    <p className={Styles["item-text"]}>1022500000786</p>
                </div>
            </div>
        </Section>
    </main>
  );
}
