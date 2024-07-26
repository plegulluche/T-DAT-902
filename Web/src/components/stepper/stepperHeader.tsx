import { Fragment } from "react/jsx-runtime";
import Step from "./step";

export default function StepperHeader({
    step,
    skip,
    labels,
    textSize,
  }: {
    step: number;
    skip?: () => void;
    labels: string[];
    textSize?: string;
    onboarding?: boolean;
  }) {
    return (
      <div className="absolute w-full top-0 min-h-[50px] z-10 flex justify-between p-[10px] shadow select-none overflow-y-auto">
        <div className=""></div>
        <div className="flex items-center justify-center gap-3">
          {labels.map((label, index) => {
            return (
              <Fragment key={index}>
                <Step
                  type={index}
                  active={step === index}
                  checked={step > index}
                  label={label}
                  textSize={textSize}
                />
                {index < labels.length - 1 && (
                  <div className="text-black w-[35px] h-[5px] rounded bg-surface" />
                )}
              </Fragment>
            );
          })}
        </div>
        {skip ? (
          <div className="flex justify-end">
            <button onClick={skip} color="outlined">
              Skip this
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  