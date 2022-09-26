import SummaryPage from "./SummaryPage";
import useSummary from "./useSummary";

export default function Summary() {
  const args = useSummary();

  return <SummaryPage {...args} />;
}
