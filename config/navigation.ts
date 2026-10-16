import { ChartNoAxesCombined, DoorOpen, ScanBarcode, SquareTerminal, Truck } from "lucide-react";

export const routes = {
    home: "/",
    register: "/register",
    login: "/login",

    locks: "/locks",
    locksNew: "/locks/new",
    locksEdit: "/locks/",

    pads: "/pads",
    padsNew: "/pads/new",
    padsEdit: "/pads/",

    knobs: "/knobs",
    knobsNew: "/knobs/new",
    knobsEdit: "/knobs/",

    bolts: "/bolts",
    boltsNew: "/bolts/new",
    boltsEdit: "/bolts/",

    peepholes: "/peepholes",
    peepholesNew: "/peepholes/new",
    peepholesEdit: "/peepholes/",

    paints: "/paints",
    paintsNew: "/paints/new",
    paintsEdit: "/paints/",

    ears: "/ears",
    earsNew: "/ears/new",
    earsEdit: "/ears/",

    packagings: "/packagings",
    packagingsNew: "/packagings/new",
    packagingsEdit: "/packagings/",

    jambHoles: "/jamb-holes",
    jambHolesNew: "/jamb-holes/new",
    jambHolesEdit: "/jamb-holes/",

    hinges: "/hinges",
    hingesNew: "/hinges/new",
    hingesEdit: "/hinges/",

    models: "/models",
    modelsNew: "/models/new",
    modelsEdit: "/models/",

    customers: "/customers",
    customersNew: "/customers/new",
    customersEdit: "/customers/",

    outsideFinishes: "/outside-finishes",
    outsideFinishesNew: "/outside-finishes/new",
    outsideFinishesEdit: "/outside-finishes/",

    foils: "/foils",
    foilsNew: "/foils/new",
    foilsEdit: "/foils/",

    insideFinishes: "/inside-finishes",
    insideFinishesNew: "/inside-finishes/new",
    insideFinishesEdit: "/inside-finishes/",

    orders: "/orders",
    ordersNew: "/orders/new",
    
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
                href: routes.foils,
                label: "Пленки мдф",
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
                href: routes.knobs,
                label: "Ручки",
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
                href: routes.paints,
                label: "Цвета покраски",
            },
            {
                href: routes.ears,
                label: "Уши",
            },
            {
                href: routes.packagings,
                label: "Упаковки",
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
