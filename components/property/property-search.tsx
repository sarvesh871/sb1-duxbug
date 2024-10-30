"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  status: z.string().optional(),
});

export default function PropertySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchParams.get("query") || "",
      city: searchParams.get("city") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      status: searchParams.get("status") || "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Search properties..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter city..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Min price..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Max price..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-8">
          Search
        </Button>
      </form>
    </Form>
  );
}