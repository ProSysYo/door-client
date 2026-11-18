type FlagFieldProps = {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export const FlagField = ({ label, checked, onCheckedChange }: FlagFieldProps) => (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-input px-3 py-2 text-sm transition-colors hover:bg-muted/50 has-checked:border-primary/40 has-checked:bg-primary/5">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className="size-4 accent-primary"
        />
        <span className="font-medium">{label}</span>
    </label>
);
