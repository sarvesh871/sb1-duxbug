"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  file: z.instanceof(FileList).refine((files) => files.length > 0, "File is required"),
});

interface DocumentUploadProps {
  propertyId: string;
}

export default function DocumentUpload({ propertyId }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
  });

  async function onSubmit(values: z.infer<typeof documentSchema>) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("file", values.file[0]);

      const response = await fetch(`/api/properties/${propertyId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      toast.success("Document uploaded successfully");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error uploading document"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload property-related documents for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Property Deed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Document File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}