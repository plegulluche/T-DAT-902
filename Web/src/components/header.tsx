import { Coins, Group, MapPin, NavArrowDown } from "iconoir-react";
import { useState } from "react";

function CountCard1(props: { count: string, onClick: () => void, selected: string}) {
    return (
        <div onClick={() => props.onClick()} className={`select-none w-16 h-10 border border-black/80 rounded-lg text-sm flex flex-col  items-center justify-center ${props.selected === props.count && "bg-black/10"} hover:bg-black/10 hover:cursor-pointer shadow`}>
            <p className="text-sm text-black font-bold">{props.count}</p>
        </div>
    );
}

function CountCard2(props: { count: string, onClick: () => void, selected: string}) {
    return (
        <div onClick={() => props.onClick()} className={`select-none w-24 h-10 border border-black/80 rounded-lg text-xs flex flex-col  items-center justify-center ${props.selected === props.count && "bg-black/10"} hover:bg-black/10 hover:cursor-pointer shadow`}>
            <p className="text-xs text-black font-bold">{props.count}</p>
        </div>
    );
}


export default function Header(props: {label: string | undefined, onChange: () => void}) {
    const [household, setHousehold] = useState<any>(localStorage.getItem('household'));
    const [budget, setBudget] = useState<any>(localStorage.getItem('budget'))

   const onChange = (value: string) => {
        localStorage.setItem("household", value);
        setHousehold(value);
        props.onChange()
    }

    const onChangeBudget = (value: string) => {
        localStorage.setItem("budget", value);
        setBudget(value);
        props.onChange()
    }

    const [open1, setOpen1] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
  
    return (
      <div className="h-10 mb-4 flex items-center gap-10">
          <p className="text-black font-semibold text-xl">Interactiv Map</p>
          <div className="text-black/50 flex gap-5 items-center">
            <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 relative" onClick={() => setOpen1(!open1)}>
            {open1 && (
                <div className="absolute z-50 top-8 w-44 left-0 bg-white rounded-lg border border-gray-300 p-3 shadow-lg flex flex-wrap gap-3">
                    <p className="text-black text-sm font-semibold">Rooms</p>
                    <div className="flex flex-wrap gap-3">
                        <CountCard1 count={"1-2"} onClick={() => onChange("1-2")} selected={household}/>
                        <CountCard1 count={"2-3"} onClick={() => onChange("2-3")} selected={household}/>
                        <CountCard1 count={"3-4"} onClick={() => onChange("3-4")} selected={household}/>
                        <CountCard1 count={"5-6"} onClick={() => onChange("5-6")} selected={household}/>
                        <CountCard1 count={"6-10"} onClick={() => onChange("6-10")} selected={household}/>
                        <CountCard1 count={"?"} onClick={() => onChange("?")} selected={household}/>
                    </div>
                </div>
            )}
              <Group width={16} height={16} strokeWidth={2} />
              <p className="text-sm">{household}</p>
              <NavArrowDown width={16} height={16} strokeWidth={2} />
            </div>
  
            <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 relative" onClick={() => setOpen2(!open2)}>
            {open2 && (
                <div className="absolute z-50 top-8 w-60 left-0 bg-white rounded-lg border border-gray-300 p-3 shadow-lg flex flex-wrap gap-3">
                    <p className="text-black text-sm font-semibold">Budget</p>
                    <div className="flex flex-wrap gap-3">
                        <CountCard2 count={"-100k"} onClick={() => onChangeBudget("-100k")} selected={budget}/>
                        <CountCard2 count={"100-200k"} onClick={() => onChangeBudget("100-200k")} selected={budget}/>
                        <CountCard2 count={"200-400k"} onClick={() => onChangeBudget("200-400k")} selected={budget}/>
                        <CountCard2 count={"400-600k"} onClick={() => onChangeBudget("400-600k")} selected={budget}/>
                        <CountCard2 count={"600k-1m"} onClick={() => onChangeBudget("600k-1m")} selected={budget}/>
                        <CountCard2 count={"1m-5m"} onClick={() => onChangeBudget("1m-5m")} selected={budget}/>
                        <CountCard2 count={"?"} onClick={() => onChangeBudget("?")} selected={budget}/>
                    </div>
                </div>
            )}
              <Coins width={16} height={16} strokeWidth={2} />
              <p className="text-sm">{budget}</p>
              <NavArrowDown width={16} height={16} strokeWidth={2} />
            </div>
  
            <div className="h-full py-1 px-3 rounded border border-gray-300 flex gap-2 items-center">
              <MapPin width={16} height={16} strokeWidth={2} />
              <p className="text-sm">{props.label}</p>
            </div>
          </div>
      </div>
    )
  }