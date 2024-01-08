import Router from "./pages/Router";
import logo from "./assets/logo.png"


export default function App() {

    return (
        <div>
            <div className="min-h-[90vh]">
                <header className="py-6 px-8 border-b-2">
                    <img src={logo} className="w-48" />
                </header>
                <div>
                    <Router />
                </div>
            </div>
            <footer className="bg-red-200 p-4">
                <p className="text-xs">Created by Jordan Checkoff | jordan.checkoff@gmail.com</p>
            </footer>
        </div>
    )
}