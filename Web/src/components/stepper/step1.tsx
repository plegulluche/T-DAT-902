import { ArrowRight } from "iconoir-react";

function CountCard(props: { count: string, onClick: () => void}) {
    return (
        <div onClick={() => props.onClick()} className="w-20 h-14 border-2 border-black/80 rounded-lg flex flex-col items-center justify-center hover:bg-black/10 hover:cursor-pointer shadow">
            <p className="text-base text-black font-bold">{props.count}</p>
        </div>
    );
}

export default function Step1({
  onValidateStep,
}: {
  onValidateStep: () => void;
}) {

  return (
    <div className="xl:w-3/4 w-full h-full flex flex-col justify-center px-10">
      <p className="text-3xl mb-8 font-semibold text-black">Combien de membres comporte <br/>votre foyer ?</p>
        <div className=" padding">
          <section className="flex flex-wrap gap-4">
            <CountCard count={"1"} onClick={() => onValidateStep()} />
            <CountCard count={"2-3"} onClick={() => onValidateStep()}/>
            <CountCard count={"3-4"} onClick={() => onValidateStep()}/>
            <CountCard count={"5-6"} onClick={() => onValidateStep()}/>
            <CountCard count={"6+"} onClick={() => onValidateStep()}/>
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
