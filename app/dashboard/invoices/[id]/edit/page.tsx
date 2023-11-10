import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";

export const metadata: Metadata = {
  title: "Edit Invoices",
};

const EditInvoice: FC<{ params: any }> = async ({ params }) => {
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {invoice && <Form invoice={invoice} customers={customers} />}
    </main>
  );
};

export default EditInvoice;
