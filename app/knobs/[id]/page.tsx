import { Suspense } from "react";
import { KnobsEdit } from "@/features/knobs/pages/knobs-edit";
import { Loader } from "@/shared/components/loader";

// Страница динамическая: читает params и грузит данные на клиенте через react-query,
// поэтому мгновенный переход к ней невозможен по дизайну.
//export const instant = false;

export default async function KnobsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <Suspense fallback={<Loader />}>
            <KnobsEdit id={id} />
        </Suspense>
    );
}
