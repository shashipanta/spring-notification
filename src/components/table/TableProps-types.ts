
export type TableProps = {
  titles: string[];
  rows: (string | number | boolean | null)[][];
  hiddenColumns?: string[];
  baseUrl?: string; // Optional base URL for table to use for actions like editing or deleting rows
  onRowClick?: (row: (string | number | boolean | null)[]) => void; // Optional callback for row click events
  onRowDelete?: (row: (string | number | boolean | null)[]) => void; // Optional callback for row delete events
  onRowEdit?: (row: (string | number | boolean | null)[]) => void; // Optional callback for row edit events
  onRowAdd?: (newRow: (string | number | boolean | null)[]) => void; // Optional callback for adding a new row
  isLoading?: boolean; // Optional loading state for the table
  error?: string; // Optional error message to display
  pagination?: {
    currentPage: number; // Current page number
    totalPages: number; // Total number of pages
    onPageChange: (page: number) => void; // Callback for page change events  
  };
  sortable?: boolean; // Optional flag to enable sorting functionality
  sortColumn?: string; // Column to sort by
  sortDirection?: 'asc' | 'desc'; // Direction of sorting
  filterable?: boolean; // Optional flag to enable filtering functionality
  filters?: Record<string, string>; // Optional filters to apply to the table data
  rowActions?: {
    edit?: boolean; // Enable edit action for rows
    delete?: boolean; // Enable delete action for rows
    custom?: { [key: string]: (row: (string | number | boolean | null)[]) => void }; // Custom actions for rows
  };
  rowClassName?: (row: (string | number | boolean | null)[]) => string; // Optional function to determine class name for each row
  cellClassName?: (cell: string | number | boolean | null, row: (string | number | boolean | null)[]) => string; // Optional function to determine class name for each cell
  emptyState?: string; // Optional message to display when there are no rows in the table
  noDataMessage?: string; // Optional message to display when there is no data
  stickyHeader?: boolean; // Optional flag to enable sticky header for the table
  stickyFooter?: boolean; // Optional flag to enable sticky footer for the table
  responsive?: boolean; // Optional flag to make the table responsive
  tableStyle?: Record<string, string> | string; // Optional inline styles for the table
  headerStyle?: Record<string, string> | string; // Optional inline styles for the table header
  rowStyle?: Record<string, string> | string; // Optional inline styles for each row
  cellStyle?: Record<string, string> | string; // Optional inline styles for each cell
  tableClassName?: string; // Optional class name for the table
  headerClassName?: string; // Optional class name for the table header
  rowClassNamePrefix?: string; // Optional prefix for row class names
  cellClassNamePrefix?: string; // Optional prefix for cell class names
  onFilterChange?: (filters: Record<string, string>) => void; // Optional callback for filter change events
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void; // Optional callback for sort change events
  onPaginationChange?: (page: number) => void; // Optional callback for pagination change events
  onResize?: (width: number, height: number) => void; // Optional callback for resize events
  customComponents?: {
    header?: unknown; // Optional custom header component
    footer?: unknown; // Optional custom footer component
    loadingIndicator?: unknown; // Optional custom loading indicator component
    errorIndicator?: unknown; // Optional custom error indicator component  
  };
  rowKey?: (row: (string | number | boolean | null)[]) => string; // Optional function to generate a unique key for each row
  columnWidths?: Record<string, number>; // Optional widths for specific columns
  columnVisibility?: Record<string, boolean>; // Optional visibility settings for specific columns
  selection?: {
    enabled?: boolean; // Enable row selection
    selectedRows?: (string | number | boolean | null)[][]; // Array of selected rows
    onSelectionChange?: (selectedRows: (string | number | boolean | null)[][]) => void; // Callback for selection change events
  };
  expandableRows?: {
    enabled?: boolean; // Enable expandable rows
    expandedRows?: (string | number | boolean | null)[][]; // Array of expanded rows
    onRowExpand?: (row: (string | number | boolean | null)[]) => void; // Callback for row expand events
    onRowCollapse?: (row: (string | number | boolean | null)[]) => void; // Callback for row collapse events
  };
  
};
