import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export type Breadcrumb = {
  name: string;
  href: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <div className="flex items-center gap-px md:gap-1 text-sm text-text-secondary ml-10">
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          to={breadcrumb.href}
          key={index}
          className="flex items-center gap-px md:gap-1 text-text-secondary text-[10px] md:text-sm hover:text-text-primary"
        >
          <span>{breadcrumb.name}</span>
          {index !== breadcrumbs.length - 1 && <ChevronRight size={16} />}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
