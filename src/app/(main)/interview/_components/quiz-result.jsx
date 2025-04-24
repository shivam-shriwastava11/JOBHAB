import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew, }) => {

    if (!result) return null;

    return (
        <div className="mx-auto">
            <h1 className="flex items-center gap-2 text-3xl gradient-title">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Quiz Results
            </h1>

            <CardContent className="space-y-6">
                {/* Score Overview */}
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
                    <Progress value={result.quizScore} className="w-full" />
                </div>

                {/* ✅ Improvement Tip Section – This exists but only shows if result.improvementTip is truthy */}
                {(result.improvementTip || "Don't stop now! Every effort you make today brings you closer to your goal. Keep learning, keep improving, and success will follow!") && (
                    <div className="p-6 rounded-lg bg-white hover:bg-gray-100 border-2 border-gray-300 shadow-md hover:shadow-xl transition-all duration-300">
                        <p className="font-medium text-lg text-gray-900">Improvement Tip:</p>
                        <p className="text-gray-700 text-xl">
                            {result.improvementTip || "Don't stop now! Every effort you make today brings you closer to your goal. Keep learning, keep improving, and success will follow!"}
                        </p>
                    </div>
                )}

                {/* Questions Review */}
                <div className="space-y-4">
                    <h3 className="font-medium">Question Review</h3>
                    {result.questions.map((q, index) => (
                        <div className="border rounded-lg p-4 space-y-2" key={index}>
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-medium">{q.question}</p>
                                {q.isCorrect ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Your answer: {q.userAnswer}</p>
                                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
                            </div>
  
                            <div className="text-sm p-4 rounded-lg bg-gray-50 border-2 border-gray-200 shadow-sm">
                                <p className="font-medium text-gray-900">Explanation:</p>
                                <p className="text-gray-700">{q.explanation}</p>
                            </div>

                        </div>
                    ))}
                </div>
                {/*  */}
            </CardContent>

            {!hideStartNew && (
                <CardFooter>
                    <div className="w-full bg-white/80 p-4 rounded-lg shadow-sm">
                        <Button onClick={onStartNew} className="w-full">
                            Start New Quiz
                        </Button>
                    </div>
                </CardFooter>
            )}


        </div>
    );
};

export default QuizResult;