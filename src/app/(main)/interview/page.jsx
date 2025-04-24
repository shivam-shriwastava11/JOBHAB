
import { getAssessments } from "../../../../actions/interview";
import PerformanceChart from "./_components/performace-chart";
import QuizeList from "./_components/quiz-list";
import StatsCards from "./_components/stats-cards";

const InterviewPage = async () => {

    const assessments = await getAssessments()

    return (

        <div className="space-y-6">
            {/* Interview Preparation Heading */}
            <h1 className="text-6xl font-bold gradient-title">
                Interview Preparation
            </h1>

            {/* White box containing the cards */}
            <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizeList assessments={assessments} />
            </div>
        </div>





    );
};

export default InterviewPage;
