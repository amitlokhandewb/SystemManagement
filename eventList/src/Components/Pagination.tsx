import React from "react";
import { Button } from "rsuite";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setItemsperpage: (page: number) => void;
  itemsperpage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setItemsperpage,
  itemsperpage,
}) => {
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };
  const hanldefirst = () => {
    if (currentPage > 0) {
      onPageChange(0);
    }
  };
  const handleLast = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(totalPages - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div style={{ marginTop: 5 }}>
      <Button
        onClick={hanldefirst}
        disabled={currentPage === 0}
        style={{ marginLeft: 5 }}
        appearance="subtle"
        color="green"
      >
        First Page
      </Button>
      <Button
        onClick={handlePrev}
        disabled={currentPage === 0}
        style={{ marginLeft: 5 }}
        appearance="subtle"
        color="green"
      >
        Previous
      </Button>
      <span style={{ marginLeft: 5 }}>{` Page ${
        currentPage + 1
      } of ${totalPages} `}</span>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        style={{ marginLeft: 5 }}
        appearance="subtle"
        color="green"
      >
        Next
      </Button>
      <Button
        onClick={handleLast}
        disabled={currentPage + 1 === totalPages}
        style={{ marginLeft: 5 }}
        appearance="subtle"
        color="green"
      >
        Last Page
      </Button>
      <select
        value={itemsperpage}
        onChange={(e) => setItemsperpage(parseInt(e.target.value))}
        style={{
          padding: 7,
          borderStyle: "none",
          backgroundColor: "#F7F7FA",
          marginLeft: 5,
          borderRadius: 3,
        }}
      >
        {[5, 10, 25, 100].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
