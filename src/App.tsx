import Router from "./pages/Router";
import logo from "./assets/logo.png"


export default function App() {

    return (
        <div>
            <header className="py-6 px-8 border-b-2">
                <img src={logo} className="w-48" />
            </header>
            <Router />
        </div>
    )
}