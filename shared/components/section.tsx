import { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "cn";

type SectionProps = {
    title: string;
    icon?: LucideIcon;
    description?: string;
    children: ReactNode;
    className?: string;
};

export const Section = ({ title, icon: Icon, description, children, className }: SectionProps) => (
    <section className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
        <div className="mb-4 flex items-start gap-3">
            {Icon && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                </span>
            )}
            <div className="space-y-0.5">
                <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
    </section>
);
