import LoginComponent from "./login";
import RegisterComponent from "./register";


export default function Login() {

    return (
        <div>
            <h1>Login page</h1>

            <div className="flex flex-col gap-4">
                <LoginComponent />
                <RegisterComponent />
            </div>
        </div>
    );
}

export const dynamic = "force-dynamic"; // This page will always be rendered on the server
export const revalidate = 0; // This page will never be cached
export const runtime = "edge"; // This page will always be rendered on the server
export const fetchCache = "force-no-store"; // This page will never be cached