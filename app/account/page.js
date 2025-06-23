
import { Section } from "@/app/components/Section/Section";
import { Breadcrumbs } from "@/app/components/Breadcrumbs/Breadcrumbs";
import { AccountComponent } from "../components/AccountComponent/AccountComponent";

export default async function PhotoPage() {
  return (
    <main>
        <Section id="personal-account" title="Личный кабинет">
          <Breadcrumbs />
          <AccountComponent />
        </Section>
    </main>
  );
}
