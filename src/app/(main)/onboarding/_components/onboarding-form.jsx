
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "../../../../../hooks/use-fetch";
import { updateUser } from "../../../../../actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


const OnboardingForm = ({ industries }) => {
    const [selectedIndustry, setSelectedIndustry] = useState(null); //erroe?
    const router = useRouter();

    const {
        loading: updateLoading,
        fn: updateUserFn,
        data: updateResult,
    } = useFetch(updateUser)

    const { register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(onboardingSchema),
    });

    const watchIndustry = watch("industry");

    const onSubmit = async (values) => {
        // console.log(values);
        try {
            const formattedIndustry = `${values.industry}-${values.subIndustry
                .toLowerCase()
                .replace(/ /g, "-")}`;

            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            });
        } catch (error) {
            console.error("Onboarding error:", error);
        }
    }

    useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success("Profile completed successfully!");
            router.push("/dashboard-id");
            router.refresh();
        }
    }, [updateResult, updateLoading]);

    return <div className="flex items-center justify-center bg-background">
        <Card className="w-full max-w-lg mt-10 mx-2">
            <CardHeader>
                <CardTitle className="gradient-title text-4xl">
                    {/* Card Title */}
                    Complete Your Profile
                </CardTitle>
                <CardDescription>
                    {/* Card Description */}
                    Select your industry to get personalized career insights and
                    recommendations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                            onValueChange={(value) => {
                                setValue("industry", value);
                                setSelectedIndustry(
                                    industries.find((ind) => ind.id === value)
                                );
                                setValue("subIndustry", "");
                            }}
                        >
                            <SelectTrigger id="industry" className="w-full">
                                <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-black text-white">
                                <SelectGroup>
                                    <SelectLabel>Industries</SelectLabel>
                                    {industries.map((ind) => (
                                        <SelectItem key={ind.id} value={ind.id}>
                                            {ind.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.industry && (
                            <p className="text-sm text-red-500">
                                {errors.industry.message}
                            </p>
                        )}
                    </div>

                    {selectedIndustry && (
                        <div className="space-y-2 " >
                            <Label htmlFor="subIndustry">Specialization</Label>
                            <Select
                                onValueChange={(value) => setValue("subIndustry", value)}
                            >
                                <SelectTrigger id="subIndustry" className="w-full">
                                    <SelectValue placeholder="Select your specialization" />
                                </SelectTrigger>
                                <SelectContent className="z-50 bg-black text-white" >
                                    <SelectGroup>
                                        <SelectLabel>Specializations</SelectLabel>
                                        {selectedIndustry?.subIndustries.map((sub) => (
                                            <SelectItem key={sub} value={sub}>
                                                {sub}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.subIndustry && (
                                <p className="text-sm text-red-500">
                                    {errors.subIndustry.message}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="space-y-2 " >
                        <Label htmlFor="experience">Years of Experience</Label>

                        <Input
                            id="experience"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="Enter years of experience"
                            {...register("experience")}
                        />

                        {errors.experience && (
                            <p className="text-sm text-red-500">
                                {errors.experience.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2 " >
                        <Label htmlFor="skills">Years of Skills</Label>

                        <Input
                            placeholder="e.g., Python, JavaScript, Project Management"
                            {...register("skills")}
                        />

                        <p className="text-sm text-muted-foreground">
                            Separate multiple skills with commas
                        </p>

                        {errors.skills && (
                            <p className="text-sm text-red-500">
                                {errors.skills.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about your professional background..."
                            className="h-32"
                            {...register("bio")}
                        />
                        {errors.bio && (
                            <p className="text-sm text-red-500">{errors.bio.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"
                        disabled={updateLoading}>
                        {updateLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Complete Profile"
                        )}
                    </Button>
                </form>

            </CardContent>
        </Card>

    </div>;
};

export default OnboardingForm;

