import { BackButton } from "@/components/buttons/backButton/backButton";
import { mainTitleStyle } from "@/constants/commonStyles";

export default function SettingsPage() {
  return (
    <>
      <BackButton />
      <h1 className={mainTitleStyle}>SettingsPage</h1>
    </>
  );
}
