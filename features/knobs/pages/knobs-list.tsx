"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/components/shadcn/button";
import { KnobsTable } from "../components/knobs-table";
import { Loader } from "@/shared/components/loader";
import { useGetKnobs } from "@/entities/knobs/knobs.queries";

export const KnobsList = () => {
    const { data, isLoading } = useGetKnobs();

    if (isLoading) return <Loader />;

    const knobs = data?.items ?? [];

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Ручки</h1>
                <Link href={routes.knobsNew}>
                    <Button variant="default" size="lg">
                        Добавить ручку
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <KnobsTable data={knobs} />
        </div>
    );
};
