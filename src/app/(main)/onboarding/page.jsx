
const { industries } = require("../../../../data/industries")
const { default: OnboardingForm } = require("./_components/onboarding-form")
import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "../../../../actions/user";



const OnboardingPage = async() => {
  // check if user is already onboarded
  const {isOnboarded}= await getUserOnboardingStatus();

  if(isOnboarded) {
    redirect("/dashboard-id")
  }

  return (
    <main>
      <OnboardingForm industries={industries} />

    </main>
  );
};


export default OnboardingPage;


