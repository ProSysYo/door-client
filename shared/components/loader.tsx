import { LoaderIcon } from "lucide-react";

type LoaderProps = {
    /** На весь экран — для страниц без AppShell (вход, регистрация). */
    fullscreen?: boolean;
};

export function Loader({ fullscreen = false }: LoaderProps) {
    return (
        <div
            className={`flex w-full items-center justify-center ${
                fullscreen ? "min-h-dvh" : "min-h-[calc(100vh-10rem)]"
            }`}
        >
            <LoaderIcon size={24} className="animate-spin" />
            <div className="ml-2 text-sm">Загрузка...</div>
        </div>
    );
}
