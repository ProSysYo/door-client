import { ChartNoAxesCombined, DoorOpen, ScanBarcode, SquareTerminal, Truck } from "lucide-react";

export const routes = {
    home: "/",
    register: "/register",
    login: "/login",

    locks: "/locks",

    pads: "/pads",

    knobs: "/knobs",

    bolts: "/bolts",

    peepholes: "/peepholes",

    paints: "/paints",

    ears: "/ears",

    packagings: "/packagings",

    jambHoles: "/jamb-holes",

    hinges: "/hinges",

    models: "/models",

    customers: "/customers",

    outsideFinishes: "/outside-finishes",

    foils: "/foils",

    insideFinishes: "/inside-finishes",

    orders: "/orders",
    ordersNew: "/orders/new",
    orderEdit: (id: number | string) => `/orders/${id}`,
};

export const navItems = [
    {
        title: "Заказы",
        url: "#",
        icon: DoorOpen,
        items: [
            {
                href: routes.ordersNew,
                label: "Новый заказ",
            },
            {
                href: routes.orders,
                label: "Все заказы",
            },
        ],
    },
    {
        title: "Отгрузка",
        url: "#",
        icon: Truck,
        items: [
            {
                href: "#",
                label: "План отгрузок",
            },
        ],
    },
    {
        title: "Штрихкод",
        url: "#",
        icon: ScanBarcode,
        items: [
            {
                href: "#",
                label: "Участки",
            },
            {
                href: "#",
                label: "Отгрузка",
            },
            {
                href: "#",
                label: "Менеджер Отгрузки",
            },
        ],
    },
    {
        title: "Статистика",
        url: "#",
        icon: ChartNoAxesCombined,
        items: [
            {
                href: "#",
                label: "По участками",
            },
            {
                href: "#",
                label: "Успеваемость",
            },
            {
                href: "#",
                label: "План",
            },
        ],
    },
    {
        title: "Таблицы",
        url: "#",
        icon: SquareTerminal,
        items: [
            {
                href: routes.packagings,
                label: "Упаковки",
            },
            {
                href: routes.knobs,
                label: "Ручки",
            },
            {
                href: routes.paints,
                label: "Цвета покраски",
            },
            {
                href: routes.foils,
                label: "Пленки мдф",
            },

            

            {
                href: routes.customers,
                label: "Заказчики",
            },
            {
                href: routes.models,
                label: "Модели",
            },
            {
                href: routes.outsideFinishes,
                label: "Отделки снаружи",
            },
            {
                href: routes.insideFinishes,
                label: "Отделки внутри",
            },

            {
                href: routes.locks,
                label: "Замки",
            },
            {
                href: routes.pads,
                label: "Накладки",
            },

            {
                href: routes.bolts,
                label: "Засовы",
            },
            {
                href: routes.peepholes,
                label: "Глазки",
            },

            {
                href: routes.ears,
                label: "Уши",
            },

            {
                href: routes.jambHoles,
                label: "Отверстия в коробе",
            },
            {
                href: routes.hinges,
                label: "Петли",
            },
        ],
    },
] as const;
