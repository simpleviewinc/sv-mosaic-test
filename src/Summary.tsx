import SummaryPage, { SummaryPageProps } from "./SummaryPage";
import useSummary from "./useSummary";

export default function Summary() {
  const args: SummaryPageProps = useSummary();

  return <SummaryPage {...args} />;
}
