export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center p-1 bg-gray-100 w-fit m-auto">
      <ul className="flex items-center gap-1">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            role="button"
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 font-semibold border border-gray-300 ${
              page === pageNumber ? "bg-gray-300" : ""
            }`}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
