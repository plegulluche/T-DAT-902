import StepperHeader from "./stepperHeader";

export default function OnboardingStepper(props: { step: number; labels: string[] }) {
    return (
      <div className="relative w-full">
        <StepperHeader
          step={props.step}
          textSize="text-sm"
          labels={props.labels}
          onboarding={true}
        />
      </div>
    );
  }
  