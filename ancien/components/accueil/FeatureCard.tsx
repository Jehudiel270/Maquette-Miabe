interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "accent"
    | "warning"
    | "error";
}

const variants = {
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    border: "border-primary/20",
  },
  secondary: {
    bg: "bg-secondary/10",
    icon: "text-secondary",
    border: "border-secondary/20",
  },
  success: {
    bg: "bg-success/10",
    icon: "text-success",
    border: "border-success/20",
  },
  info: {
    bg: "bg-info/10",
    icon: "text-info",
    border: "border-info/20",
  },
  accent: {
    bg: "bg-accent/10",
    icon: "text-accent",
    border: "border-accent/20",
  },
  warning: {
    bg: "bg-warning/10",
    icon: "text-warning",
    border: "border-warning/20",
  },
  error: {
    bg: "bg-error/10",
    icon: "text-error",
    border: "border-error/20",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "primary",
}: FeatureCardProps) {
  const style = variants[variant];

  return (
    <div
      className={`
        card
        ${style.bg}
        ${style.border}
        border
        shadow-sm
        hover:shadow-md
        transition-all
      `}
    >
      <div className="card-body">
        <div className={`text-3xl ${style.icon}`}>{icon}</div>

        <h3 className="card-title">{title}</h3>

        {description && <p className="text-base-content/70">{description}</p>}
      </div>
    </div>
  );
}
