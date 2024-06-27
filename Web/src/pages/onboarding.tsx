import { useState } from "react";
import Step1 from "../components/stepper/step1";
import Step2 from "../components/stepper/step2";
import Step3 from "../components/stepper/step3";
import { useNavigate } from "react-router";
import OnboardingStepper from "../components/stepper/onboardingStepper";
import { OnboardingStepperInformations } from "../components/stepper/stepperInformations";

function OnboardingHeader() {
    return (
      <div className="flex xl:flex-col flex-row items-center xl:gap-0 gap-8 text-white">
        <img
          src="illu.png"
          alt="logo"
          className="rounded-lg"
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center">
          <p className="xl:text-4xl md:text-3xl text-2xl font-semibold mt-5">
            Bienvenue !
          </p>
          <p className="xl:mt-3 mt-2 text-basic-300 xl:text-base text-sm">
            Ces questions nous aides à mieux vous comprendre
          </p>
        </div>
      </div>
    );
  }

  
function OnboardingStepContent({
  step,
  onValidateStep,
}: {
  step: number;
  onValidateStep: () => void;
}) {
  switch (step) {
    case 0:
      return (
        <Step1 onValidateStep={onValidateStep} />
      );
    case 1:
      return (
        <Step2 onValidateStep={onValidateStep} />
      );
    case 2:
      return (
        <Step3 onValidateStep={onValidateStep} />
      );
  }
}


enum StepType {
    FOYER = 0,
    BUDGET = 1,
    LOCALISATION = 2
}

export default function Onboarding({
}: {
}) {
  const labels = ["Foyer", "Budget", "Localisation"];
  const [step, setStep] = useState<StepType>(StepType.FOYER);
  const navigate = useNavigate()

  const onValidateStep = () => {
    if (step === StepType.LOCALISATION) navigate("/map")
    setStep((prev) => prev + 1);
  };

  return (
      <div className="h-screen w-full overflow-y-auto">
        <div className="w-full h-full flex xl:flex-row flex-col">
            <div className="xl:w-[35%] w-full xl:h-full h-fit flex flex-col items-center justify-start xl:py-16 py-12 gap bg-black/50">
              <OnboardingHeader />
              <div className="h-[1px] bg-basic-300 w-1/2 xl:my-5 my-3"></div>
              <div className="flex flex-col items-center justify-center w-full gap">
                <div className="w-full flex flex-col items-center xl:mt-4 mt-0">
                  <OnboardingStepperInformations step={step} labels={labels} />
                </div>
              </div>
            </div>
          <div
            className={`${
              "xl:w-[65%] w-full"
            } flex flex-col h-full bg-[#FFFBF0]`}
          >
            <OnboardingStepper step={step} labels={labels} />
              <div className="w-full h-full flex flex-col items-center justify-center pb-5 overflow-y-auto">
                <OnboardingStepContent
                  step={step}
                  onValidateStep={onValidateStep}
                />
              </div>
          </div>
        </div>
      </div>
  );
}
