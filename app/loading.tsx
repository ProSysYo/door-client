import { LoaderIcon } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <LoaderIcon size={24} className="animate-spin" />
            <div className="ml-2 text-sm">Загрузка...</div>
        </div>
    );
}
