import ProgressBar from "../components/progressBar"

function Header() {
    return (
      <div className="h-10 mb-4 flex items-center gap-10">
          <p className="text-black font-semibold text-xl">Cities comparison</p>
      </div>
    )
}

function City1() {
    return (
        <div className="w-full h-full border-r-2 p-5 flex flex-col items-center">
            <p className="text-4xl font-semibold text-black">Paris</p>
            <div className="w-full mt-8 flex flex-col items-center px-20 gap-5">
                 <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Qualité de vie</p>
                    <ProgressBar value={72} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Prix m2</p>
                    <ProgressBar value={14} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Connexion internet</p>
                    <ProgressBar value={89} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Centres sportifs</p>
                    <ProgressBar value={92} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Ecoles</p>
                    <ProgressBar value={53} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Sécurité</p>
                    <ProgressBar value={25} />
                </div>
            </div>
        </div>
    )
}

function City2() {
    return (
        <div className="w-full h-full p-5 flex flex-col items-center">
            <p className="text-4xl font-semibold text-black">Lyon</p>
            <div className="w-full mt-8 flex flex-col items-center px-20 gap-5">
                 <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Qualité de vie</p>
                    <ProgressBar value={72} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Prix m2</p>
                    <ProgressBar value={14} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Connexion internet</p>
                    <ProgressBar value={89} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Centres sportifs</p>
                    <ProgressBar value={92} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Ecoles</p>
                    <ProgressBar value={53} />
                </div>
                <div className="flex flex-col gap-1 w-full text-black items-start">
                    <p className="text-base font-semibold">Sécurité</p>
                    <ProgressBar value={25} />
                </div>
            </div>
        </div>
    )
}


export default function ComparePage() {

    return (
        <div className="">
            <div className="bg-white rounded-lg p-5 flex flex-col border-2 border-gray-200" style={{height: '95dvh'}}>
                <Header />
                <div className="flex gap h-full w-full mt-2">
                    <City1 />
                    <City2 />
                </div>
            </div>
        </div>
    )
}