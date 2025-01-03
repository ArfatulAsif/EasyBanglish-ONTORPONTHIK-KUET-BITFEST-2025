import { Link } from "react-router";

const SectionCard = ({ title, icon, to, total, loading, error, hideTotal }) => {
  return (
    <Link to={to}>
      <article className="rounded-xl bg-[#18181B] p-4 border border-default sm:p-6 lg:p-8">
        <div className="flex items-start sm:gap-8">
          <div
            className="text-primary hidden sm:grid sm:size-16 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-primary"
            aria-hidden="true"
          >
            {icon}
          </div>

          <div>
            <strong className="rounded border border-primary bg-primary px-3 py-1.5 text-[10px] font-medium text-white">
              {title}
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              {loading && (
                <span className="loading loading-dots loading-md"></span>
              )}
              {!loading && !error && !hideTotal && `Total: ${total}`}
              {!loading && error && (
                <span className="text-red-500">{error}</span>
              )}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default SectionCard;
