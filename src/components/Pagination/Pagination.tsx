import './Pagination.css';

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalBlogs: number
}

export function Pagination({ currentPage, totalPages, onPageChange, totalBlogs }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };
  if (totalPages <= 1) return null ;

  return (
    <div className="custom-pagination">
      {/* Previous Button */}
      <button
        className="nav-btn prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; 上一页
      </button>
      <div className="page-numbers-container">
        {getPageNumbers().map((num, index) => (
          <button
            key={index}
            onClick={() => typeof num === 'number' ? onPageChange(num) : undefined}
            className={`num-btn ${currentPage === num ? 'active' : ''} ${num === '...' ? 'dots' : ''}`}
            disabled={num === '...'}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一页 &raquo;
      </button>

      {/* Page Info */}
      <span className="page-info">
         {currentPage * 10 - 9} / {totalBlogs}
      </span>
    </div>
  )
}