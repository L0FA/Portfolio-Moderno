import { useInView } from "@/hooks/useInView";

export const Reveal = ({ as = "div", delay = 0, className = "", children, ...props }) => {
  const Tag = as;
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
};
