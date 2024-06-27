import { ArrowRight } from "iconoir-react";
import { useState } from "react";

function CountCard(props: { count: string, onClick: () => void}) {
    return (
        <div onClick={() => props.onClick()} className="w-32 h-14 border-2 border-black/80 rounded-lg flex flex-col items-center justify-center hover:bg-black/10 hover:cursor-pointer shadow">
            <p className="text-base text-black font-bold">{props.count}</p>
        </div>
    );
}

export default function Step2({
  onValidateStep,
}: {
  onValidateStep: () => void;
}) {

  const [type, setType] = useState<string>("ACHAT");

  return (
    <div className="xl:w-3/4 w-full h-full flex flex-col justify-center px-10">
      <p className="text-3xl mb-8 font-semibold text-black">Quel est votre tranche <br/>de budget ?</p>
        <div className="padding">
          <section className="flex flex-wrap gap-4">
            <CountCard count={"-100k"} onClick={() => onValidateStep()} />
            <CountCard count={"100-200k"} onClick={() => onValidateStep()}/>
            <CountCard count={"200-300k"} onClick={() => onValidateStep()}/>
            <CountCard count={"300-400k"} onClick={() => onValidateStep()}/>
            <CountCard count={"400-600K"} onClick={() => onValidateStep()}/>
            <CountCard count={"+600K"} onClick={() => onValidateStep()}/>
            <CountCard count={"+1M"} onClick={() => onValidateStep()}/>
          </section>
        </div>
        <div className="w-full mt-4 flex justify-end">
          <button className="flex gap-2 items-center" onClick={() => onValidateStep()}>
            <p>Next step</p>
            <ArrowRight width={14} height={14} strokeWidth={2.5} />
          </button>
        </div>
    </div>
  );
}
