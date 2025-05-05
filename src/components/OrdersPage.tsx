"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder, TOrder } from "@/types";
import ChangeStatusModal from "./ChangeStatusModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import OrderDetailsModal from "./OrderDetailsModal";

const fetchOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};

export default function OrdersPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [details, setDetails] = React.useState<TOrder | undefined>(undefined);
  const [orderDetails, setOrderDetails] = React.useState<IOrder | undefined>();

  const { data, isLoading, error, refetch, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customar Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => (
        <div className="w-[300px]">
          {row?.original?.products?.map((prod, index) => {
            const text = `${prod?.name.replace(/\।/g, " ")} , ${
              prod?.quantity
            } টি ।`;

            // Split the text into chunks of around 40 characters without breaking words
            const words = text.split(" ");
            // eslint-disable-next-line prefer-const
            let lines = [];
            let currentLine = "";

            words.forEach((word) => {
              if ((currentLine + word).length > 45) {
                lines.push(currentLine.trim());
                currentLine = word + " ";
              } else {
                currentLine += word + " ";
              }
            });

            if (currentLine.trim()) lines.push(currentLine.trim());

            return (
              <div key={index}>
                {lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            );
          })}
        </div>
      ),
    },

    {
      accessorKey: "mobile",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mobile
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("mobile")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            <span className="text-xl font-bold">৳ </span>
            {row.original.total.toFixed()}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order At
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {(row.original.createdAt as unknown as string).slice(0, 10)}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
            {row.original?.status === "Delivery" ? (
              <Button
                onClick={() => {
                  setIsDetailsOpen(true);
                  setDetails(row.original);
                }}
                className="bg-green-800 hover:bg-green-900 text-white"
              >
                View Details
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsOpen(true);
                  setOrderDetails(row.original as unknown as IOrder);
                }}
                className="cursor-pointer"
                variant="secondary"
              >
                Place Order
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }

  if (error || isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Phone..."
          value={(table.getColumn("mobile")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("mobile")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {orderDetails && (
        <ChangeStatusModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refetch={refetch}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      )}
      {details && (
        <OrderDetailsModal
          selectOrderDetails={details}
          isOpen={isDetailsOpen}
          setIsOpen={setIsDetailsOpen}
        />
      )}
    </div>
  );
}
