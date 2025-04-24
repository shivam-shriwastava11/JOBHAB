
import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "../../../../actions/user";
import DashboardView from "./_components/dashboard-view";
import { getIndustryInsights } from "../../../../actions/dashboard-id";

const IndustryInsightsPage = async () => {

  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();

  if (!isOnboarded) {
    redirect("/onboardingpage")
  }

  return <div>
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  </div>;

};

export default IndustryInsightsPage;
