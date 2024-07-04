import { ArrowRight } from "iconoir-react";
import { useState } from "react";

function CountCard(props: { count: string, onClick: () => void, selected: string}) {
    return (
      <div onClick={() => props.onClick()} className={`select-none w-32 h-14 border-2 border-black/80 rounded-lg flex flex-col items-center justify-center ${props.selected === props.count && "bg-black/10"} hover:bg-black/10 hover:cursor-pointer shadow`}>
      <p className="text-base text-black font-bold">{props.count}</p>
        </div>
    );
}

export default function Step2({
  onValidateStep,
}: {
  onValidateStep: () => void;
}) {
  const [selected, setSelected] = useState<string>("");

  const onSelect = (count: string) => { 
    setSelected(count);
    localStorage.setItem("budget", count);
  }

  return (
    <div className="xl:w-3/4 w-full h-full flex flex-col justify-center px-10">
      <p className="text-3xl mb-8 font-semibold text-black">Quel est votre tranche <br/>de budget ?</p>
        <div className="padding">
          <section className="flex flex-wrap gap-4">
            <CountCard count={"-100k"} onClick={() => onSelect("-100k")} selected={selected}/>
            <CountCard count={"100-200k"} onClick={() => onSelect("100-200k")} selected={selected}/>
            <CountCard count={"200-300k"} onClick={() => onSelect("200-300k")} selected={selected}/>
            <CountCard count={"300-400k"} onClick={() => onSelect("300-400k")} selected={selected}/>
            <CountCard count={"400-600k"} onClick={() => onSelect("400-600k")} selected={selected}/>
            <CountCard count={"+600k"} onClick={() => onSelect("+600k")} selected={selected}/>
            <CountCard count={"+1m"} onClick={() => onSelect("+1m")} selected={selected}/>
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
