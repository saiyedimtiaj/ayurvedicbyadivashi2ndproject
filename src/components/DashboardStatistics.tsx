"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStatistics() {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard-stats", date],
    queryFn: async () => {
      let startDate, endDate;

      if (date?.from) {
        startDate = new Date(date.from);
        startDate.setHours(0, 0, 0, 0); // দিন শুরু

        endDate = date.to ? new Date(date.to) : new Date(date.from);
        endDate.setHours(23, 59, 59, 999); // দিন শেষ
      }

      const response = await axios.get("/api/dashboard", {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });

      return response.data;
    },
  });

  // Refetch data when the date changes
  React.useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date, refetch]);

  return (
    <div className="mt-5">
      <label className="font-medium">Select Date</label>
      <br />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Total Value</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {isLoading ? (
                <Skeleton className="w-20 h-8" />
              ) : (
                <>
                  <span className="text-2xl mr-1 font-extrabold">৳</span>
                  {data?.totalValue?.toFixed(0) ?? 0}
                </>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Orders</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {isLoading ? (
                <Skeleton className="w-10 h-8" />
              ) : (
                data?.orderCount ?? 0
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
