import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbLink as ShadBreadcrumbLink } from "@/components/ui/breadcrumb";

interface CustomBreadcrumbLinkProps {
  to: string;
  children: React.ReactNode;
}

// CustomBreadcrumbLink wraps ShadBreadcrumbLink and passes Link as the main child
const CustomBreadcrumbLink: React.FC<CustomBreadcrumbLinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <ShadBreadcrumbLink asChild {...props}>
      <Link to={to}>{children}</Link>
    </ShadBreadcrumbLink>
  );
};

export default CustomBreadcrumbLink;
