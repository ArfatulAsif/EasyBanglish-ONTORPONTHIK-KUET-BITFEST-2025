import { Link } from "react-router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const PageHeader = ({ breadcrumbLinks }) => {
  return (
    <div className="shadow-sm bg-[#18181b] border-b-1 border-b-default p-4 drop-shadow-md">
      <Breadcrumbs>
        {breadcrumbLinks.map((link) => {
          return (
            <BreadcrumbItem key={link.to}>
              <Link to={link.to} className="flex gap-2 items-center">
                <link.icon />
                {link.text}
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default PageHeader;
