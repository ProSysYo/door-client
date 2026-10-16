"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    ClipboardList,
    Factory,
    Flame,
    Gauge,
    Layers,
    Package,
    PaintBucket,
    Truck,
    Wrench,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                             dashboard styles                               */
/* -------------------------------------------------------------------------- */

const styles = `
@keyframes d-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes d-conveyor {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes d-scan {
  0%, 100% { top: 8%; }
  50%      { top: 86%; }
}
@keyframes d-flow {
  to { background-position: 200% 0; }
}
@keyframes d-glow {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50%      { opacity: 0.6;  transform: scale(1.08); }
}
@keyframes d-ring {
  0%   { transform: scale(0.7); opacity: 0.7; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes d-spark {
  to { stroke-dashoffset: 0; }
}
@keyframes d-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}
@keyframes d-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes d-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.2; }
}

.d-fade-up { animation: d-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.d-conveyor { animation: d-conveyor 24s linear infinite; }
.d-scan { animation: d-scan 2.4s ease-in-out infinite; }
.d-flow { background-size: 200% 100%; animation: d-flow 2.6s linear infinite; }
.d-glow { animation: d-glow 4s ease-in-out infinite; }
.d-ring { animation: d-ring 2.6s ease-out infinite; }
.d-float { animation: d-float 4s ease-in-out infinite; }
.d-grow { transform-origin: left; animation: d-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
.d-blink { animation: d-blink 1.4s ease-in-out infinite; }
.d-spark { stroke-dasharray: 200; stroke-dashoffset: 200; animation: d-spark 1.8s ease-out forwards; }

@media (prefers-reduced-motion: reduce) {
  .d-fade-up, .d-conveyor, .d-scan, .d-flow, .d-glow,
  .d-ring, .d-float, .d-grow, .d-blink, .d-spark {
    animation: none !important;
  }
}
`;

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

function useCountUp(target: number, duration = 1200) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let raf = 0;
        const start = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return value;
}

function useClock() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const tick = () => setNow(new Date());
        const id = setInterval(tick, 1000);
        const initial = setTimeout(tick, 0);
        return () => {
            clearInterval(id);
            clearTimeout(initial);
        };
    }, []);

    return now;
}

function greeting(hour: number) {
    if (hour < 6) return "Доброй ночи";
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
}

/* -------------------------------------------------------------------------- */
/*                                 primitives                                 */
/* -------------------------------------------------------------------------- */

function Sparkline({ data, color }: { data: number[]; color: string }) {
    const points = useMemo(() => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        return data
            .map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 28 - ((d - min) / range) * 24 - 2;
                return `${x},${y}`;
            })
            .join(" ");
    }, [data]);

    return (
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-full overflow-visible">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={200}
                className="d-spark"
                style={{ animationDelay: "0.25s" }}
            />
        </svg>
    );
}

type Kpi = {
    title: string;
    value: number;
    delta: number;
    data: number[];
    color: string;
    icon: LucideIcon;
    delay: number;
};

function KpiCard({ title, value, delta, data, color, icon: Icon, delay }: Kpi) {
    const animated = useCountUp(value);
    const positive = delta >= 0;

    return (
        <div
            className="d-fade-up group relative overflow-hidden rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-ring/60"
            style={{ animationDelay: `${delay}s` }}
        >
            <div
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: color }}
            />

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `color-mix(in oklch, ${color} 18%, transparent)`, color }}
                    >
                        <Icon className="size-4" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{title}</span>
                </div>

                <span
                    className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                        positive ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"
                    }`}
                >
                    {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {Math.abs(delta)}%
                </span>
            </div>

            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">{animated}</p>

            <div className="mt-1">
                <Sparkline data={data} color={color} />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    hero                                    */
/* -------------------------------------------------------------------------- */

function Hero({ email }: { email?: string | null }) {
    const now = useClock();
    const hour = now?.getHours() ?? 12;

    return (
        <div className="d-fade-up relative overflow-hidden rounded-2xl border bg-linear-to-br from-card via-card to-secondary p-6">
            <div className="d-glow pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-chart-1 opacity-30 blur-3xl" />
            <div className="d-glow pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-chart-2 opacity-20 blur-3xl [animation-delay:1.5s]" />

            <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight">
                        {greeting(hour)}, {email?.split("@")[0] ?? "коллега"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Сводка по производству железных дверей на текущий момент.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-mono text-2xl font-semibold tabular-nums">
                            {now ? now.toLocaleTimeString("ru-RU") : "--:--:--"}
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {now
                                ? now.toLocaleDateString("ru-RU", {
                                      weekday: "long",
                                      day: "numeric",
                                      month: "long",
                                  })
                                : ""}
                        </p>
                    </div>

                    <span className="flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
                        <span className="relative flex size-2">
                            <span className="d-ring absolute inline-flex size-full rounded-full bg-emerald-500" />
                            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                        </span>
                        Производство активно
                    </span>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              production line                               */
/* -------------------------------------------------------------------------- */

const stages: { label: string; icon: LucideIcon; count: number; color: string }[] = [
    { label: "Заготовка", icon: Layers, count: 48, color: "var(--chart-1)" },
    { label: "Сварка", icon: Flame, count: 36, color: "var(--chart-5)" },
    { label: "Покраска", icon: PaintBucket, count: 24, color: "var(--chart-3)" },
    { label: "Сборка", icon: Wrench, count: 18, color: "var(--chart-4)" },
    { label: "Упаковка", icon: Package, count: 12, color: "var(--chart-2)" },
    { label: "Отгрузка", icon: Truck, count: 7, color: "var(--chart-1)" },
];

function ProductionLine() {
    return (
        <div className="d-fade-up rounded-xl border bg-card p-5 shadow-sm [animation-delay:0.4s]">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Factory className="size-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Производственная линия</h2>
                </div>
                <span className="text-xs text-muted-foreground">заказов в работе — 3</span>
            </div>

            <div className="relative">
                <div className="d-flow absolute left-0 right-0 top-5 hidden h-px bg-[linear-gradient(90deg,transparent,var(--chart-1),var(--chart-2),transparent)] sm:block" />
                <div className="grid grid-cols-3 gap-y-5 sm:grid-cols-6">
                    {stages.map((stage, i) => (
                        <div
                            key={stage.label}
                            className="d-fade-up relative z-10 flex flex-col items-center gap-2"
                            style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                        >
                            <span
                                className="flex size-8 items-center justify-center rounded-full border-2 bg-card"
                                style={{ borderColor: stage.color, color: stage.color }}
                            >
                                <stage.icon className="size-4" />
                            </span>
                            <span className="text-center text-xs font-medium">{stage.label}</span>
                            <span className="rounded-full bg-muted px-1 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                                {stage.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              orders in work                                */
/* -------------------------------------------------------------------------- */

const orders = [
    { number: "2026-014", customer: "Красноярск", model: "МП3", total: 50, done: 31, color: "var(--chart-1)" },
    { number: "2026-013", customer: "ГАМ", model: "ПП2", total: 24, done: 18, color: "var(--chart-2)" },
    { number: "2026-012", customer: "РДК", model: "ДПП2", total: 12, done: 9, color: "var(--chart-3)" },
    { number: "2026-011", customer: "Склад", model: "МП2", total: 40, done: 12, color: "var(--chart-4)" },
];

function OrdersInWork() {
    return (
        <div className="d-fade-up rounded-xl border bg-card p-5 shadow-sm [animation-delay:0.55s]">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ClipboardList className="size-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Заказы в работе</h2>
                </div>
                <span className="text-xs text-muted-foreground">126 дверей</span>
            </div>

            <div className="space-y-4">
                {orders.map((order, i) => {
                    const percent = Math.round((order.done / order.total) * 100);

                    return (
                        <div
                            key={order.number}
                            className="d-fade-up space-y-1.5"
                            style={{ animationDelay: `${0.65 + i * 0.1}s` }}
                        >
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium tabular-nums">#{order.number}</span>
                                    <span className="text-xs text-muted-foreground">{order.customer}</span>
                                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                        {order.model}
                                    </span>
                                </div>
                                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                                    {order.done}/{order.total}
                                </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="d-grow h-full rounded-full"
                                    style={{
                                        width: `${percent}%`,
                                        backgroundColor: order.color,
                                        animationDelay: `${0.8 + i * 0.1}s`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                               activity feed                                */
/* -------------------------------------------------------------------------- */

type ActivityItem = {
    text: string;
    meta: string;
    icon: LucideIcon;
    color: string;
};

const activity: ActivityItem[] = [
    { text: "Дверь 2026-014-031 прошла сборку", meta: "Цех сборки · 2 мин", icon: Wrench, color: "var(--chart-4)" },
    {
        text: "Заказ #2026-014 запущен в производство",
        meta: "50 дверей · 18 мин",
        icon: Factory,
        color: "var(--chart-1)",
    },
    { text: "Дверь 2026-013-018 упакована", meta: "Упаковка · 34 мин", icon: Package, color: "var(--chart-2)" },
    { text: "Заказ #2026-011 отгружен", meta: "Клиент «Склад» · 58 мин", icon: Truck, color: "var(--chart-3)" },
    { text: "Заказ #2026-012 отгружен", meta: "Клиент «Склад» · 59 мин", icon: Truck, color: "var(--chart-3)" },
];

function ActivityFeed() {
    return (
        <div className="d-fade-up flex flex-col gap-4 rounded-xl border bg-card p-3 shadow-sm [animation-delay:0.6s]">
            <div className="flex items-center gap-1">
                <Activity className="size-1 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Активность цеха</h2>
            </div>

            <div className="space-y-1">
                {activity.map((item, i) => (
                    <div
                        key={i}
                        className="d-fade-up flex items-start gap-3"
                        style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                    >
                        <span
                            className="mt-0.1 flex size-7 shrink-0 items-center justify-center rounded-lg"
                            style={{
                                backgroundColor: `color-mix(in oklch, ${item.color} 18%, transparent)`,
                                color: item.color,
                            }}
                        >
                            <item.icon className="size-3" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm">{item.text}</p>
                            <p className="text-xs text-muted-foreground">{item.meta}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  dashboard                                 */
/* -------------------------------------------------------------------------- */

const kpis: Kpi[] = [
    {
        title: "Всего заказов",
        value: 128,
        delta: 12,
        data: [8, 12, 10, 16, 14, 20, 24, 22, 28],
        color: "var(--chart-1)",
        icon: ClipboardList,
        delay: 0.1,
    },
    {
        title: "В производстве",
        value: 32,
        delta: 8,
        data: [20, 18, 24, 22, 26, 25, 30, 28, 32],
        color: "var(--chart-5)",
        icon: Factory,
        delay: 0.2,
    },
    {
        title: "Готово к отгрузке",
        value: 18,
        delta: -4,
        data: [14, 16, 15, 18, 17, 19, 16, 18, 18],
        color: "var(--chart-2)",
        icon: Gauge,
        delay: 0.3,
    },
    {
        title: "Отгружено сегодня",
        value: 7,
        delta: 50,
        data: [1, 2, 2, 3, 4, 4, 5, 6, 7],
        color: "var(--chart-3)",
        icon: Truck,
        delay: 0.4,
    },
];

export default function Home() {
    return (
        <div className="space-y-6">
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} />
                ))}
            </section>

            <ProductionLine />

            <section className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <OrdersInWork />
                </div>
                <div className="lg:col-span-2">
                    <ActivityFeed />
                </div>
            </section>
        </div>
    );
}
