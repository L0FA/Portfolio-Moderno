const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border text-foreground hover:border-primary/60 hover:bg-surface-2",
};

// Renderiza <a> si recibe href (evita anidar <button> dentro de <a>).
export const Button = ({ variant = "primary", className = "", href, children, ...props }) => {
  const classes = `inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;
  return href ? (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  ) : (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
