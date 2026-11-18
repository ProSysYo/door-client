import type { Bolt } from "@/entities/bolts/bolts.types";
import type { Customer } from "@/entities/customers/customers.types";
import type { Ear } from "@/entities/ears/ears.types";
import type { Foil } from "@/entities/foils/foils.types";
import type { Hinge } from "@/entities/hinges/hinges.types";
import type { InsideFinish } from "@/entities/inside-finishes/inside-finishes.types";
import type { JambHole } from "@/entities/jamb-holes/jamb-holes.types";
import type { Knob } from "@/entities/knobs/knobs.types";
import type { Lock } from "@/entities/locks/locks.types";
import type { Model } from "@/entities/models/models.types";
import type { OutsideFinish } from "@/entities/outside-finishes/outside-finishes.types";
import type { Packaging } from "@/entities/packagings/packagings.types";
import type { Pad } from "@/entities/pads/pads.types";
import type { Paint } from "@/entities/paints/paints.types";

export type SelectOption = {
    value: string;
    label: string;
};

export type OrderFormSources = {
    customers: Customer[];
    models: Model[];
    locks: Lock[];
    pads: Pad[];
    knobs: Knob[];
    bolts: Bolt[];
    paints: Paint[];
    ears: Ear[];
    packagings: Packaging[];
    jambHoles: JambHole[];
    hinges: Hinge[];
    foils: Foil[];
    outsideFinishes: OutsideFinish[];
    insideFinishes: InsideFinish[];
};

export type OrderFormOptions = {
    [K in keyof OrderFormSources]: SelectOption[];
};
