import { Fragment } from "react/jsx-runtime";

function StepInformations(props: { step: number }) {
    switch (props.step) {
      case 0:
        return (
          <Fragment>
            <p className="text-white xl:mt-5 mt-3 xl:text-base text-sm">
                Combien de personne vont vivre dans le foyer ?
            </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <p className="text-white xl:mt-5 mt-3 xl:text-base text-sm">
              Indiquez votre budget pour le loyer ?
            </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <p className="text-white xl:mt-5 mt-3 xl:text-base text-sm">
              Où souhaitez-vous habiter ?
            </p>
          </Fragment>
        );
    }
  }
  
export function OnboardingStepperInformations(props: {
    step: number;
    labels: string[];
  }) {
    return (
      <div className="border border-basic-300 p-4 rounded flex flex-col items-center text-center w-2/3">
        <div className="flex bg-white w-fit p-1 rounded-full items-center justify-center gap-3 pr-4">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
            <p className="text-base text-white font-semibold">{props.step + 1}</p>
          </div>
          <p className="text-black xl:text-lg text-base">
            {props.labels[props.step]}
          </p>
        </div>
        <StepInformations step={props.step} />
      </div>
    );
  }
  