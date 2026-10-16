"use client";

import { useRouter } from "next/navigation";
import { Loader } from "@/shared/components/loader";
import { KnobForm } from "../components/knob-form";
import { useGetKnob } from "@/entities/knobs/knobs.queries";

interface KnobsEditProps {
    id: string;
}

export const KnobsEdit = ({ id }: KnobsEditProps) => {
    const router = useRouter();
    const { data: knob, isLoading } = useGetKnob(Number(id));

    if (isLoading) return <Loader />;
    if (!knob) return <div>Ручка не найдена</div>;

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать ручку</h1>
                    <p className="text-sm text-muted-foreground">Измените данные ручки</p>
                </div>
                <KnobForm
                    editId={knob.id}
                    initialValues={{ name: knob.name }}
                    onSuccess={() => router.back()}
                />
            </div>
        </div>
    );
};
