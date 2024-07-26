import { NavArrowRight } from "iconoir-react";
import { Link } from "react-router-dom";

export default function App() {

  return (
    <div className="w-full flex gap-2 relative">
      <div className="w-full flex flex-col items-center justify-start pt-10 text-center">
        <img src="gif2.gif" width={500} height={500}/>
        <p className="text-4xl font-bold text-black/80">Vous cherchez le meilleur endroit <br /> où habiter ?</p>
        <Link to="/onboarding">
          <button className="mt-8 font-semibold flex gap-2 items-center py-3">
            Commencer dès maintenant
            <NavArrowRight width={18} height={18} strokeWidth={2} className="text-white" />
          </button>
        </Link>
      </div>
    </div>
  )
}

