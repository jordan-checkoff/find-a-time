import Router from "./pages/Router";
import logo from "./assets/logo.png"


export default function App() {

    return (
        <div>
            <header className="py-4 px-8">
                <img src={logo} className="w-60" />
            </header>
            <Router />
        </div>
    )
}