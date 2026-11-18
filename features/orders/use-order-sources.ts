"use client";

import { useMemo } from "react";
import { useGetCustomers } from "@/entities/customers/customers.queries";
import { useGetModels } from "@/entities/models/models.queries";
import { useGetLocks } from "@/entities/locks/locks.queries";
import { useGetPads } from "@/entities/pads/pads.queries";
import { useGetKnobs } from "@/entities/knobs/knobs.queries";
import { useGetBolts } from "@/entities/bolts/bolts.queries";
import { useGetPaints } from "@/entities/paints/paints.queries";
import { useGetEars } from "@/entities/ears/ears.queries";
import { useGetPackagings } from "@/entities/packagings/packagings.queries";
import { useGetJambHoles } from "@/entities/jamb-holes/jamb-holes.queries";
import { useGetHinges } from "@/entities/hinges/hinges.queries";
import { useGetFoils } from "@/entities/foils/foils.queries";
import { useGetOutsideFinishes } from "@/entities/outside-finishes/outside-finishes.queries";
import { useGetInsideFinishes } from "@/entities/inside-finishes/inside-finishes.queries";
import type { OrderFormSources } from "./order-types";

export function useOrderSources() {
    const customers = useGetCustomers();
    const models = useGetModels();
    const locks = useGetLocks();
    const pads = useGetPads();
    const knobs = useGetKnobs();
    const bolts = useGetBolts();
    const paints = useGetPaints();
    const ears = useGetEars();
    const packagings = useGetPackagings();
    const jambHoles = useGetJambHoles();
    const hinges = useGetHinges();
    const foils = useGetFoils();
    const outsideFinishes = useGetOutsideFinishes();
    const insideFinishes = useGetInsideFinishes();

    const queries = [
        customers,
        models,
        locks,
        pads,
        knobs,
        bolts,
        paints,
        ears,
        packagings,
        jambHoles,
        hinges,
        foils,
        outsideFinishes,
        insideFinishes,
    ];

    const sources = useMemo<OrderFormSources>(
        () => ({
            customers: customers.data ?? [],
            models: models.data ?? [],
            locks: locks.data ?? [],
            pads: pads.data ?? [],
            knobs: knobs.data ?? [],
            bolts: bolts.data ?? [],
            paints: paints.data ?? [],
            ears: ears.data ?? [],
            packagings: packagings.data ?? [],
            jambHoles: jambHoles.data ?? [],
            hinges: hinges.data ?? [],
            foils: foils.data ?? [],
            outsideFinishes: outsideFinishes.data ?? [],
            insideFinishes: insideFinishes.data ?? [],
        }),
        [
            customers.data,
            models.data,
            locks.data,
            pads.data,
            knobs.data,
            bolts.data,
            paints.data,
            ears.data,
            packagings.data,
            jambHoles.data,
            hinges.data,
            foils.data,
            outsideFinishes.data,
            insideFinishes.data,
        ],
    );

    return {
        sources,
        isLoading: queries.some((query) => query.isLoading),
        isError: queries.some((query) => query.isError),
    };
}
