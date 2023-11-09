"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a dude",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount bigger than 0" }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export const createInvoice = async (prevState: State, formData: FormData) => {
  console.info("CERTEASDASDASD", prevState);

  const validFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validFields.success) {
    return {
      errors: validFields.error.flatten().fieldErrors,
      message: "MIssing fields. Failed to create invoice",
    };
  }

  const { amount, customerId, status } = validFields.data;

  const amountInCents = Number(amount * 100);
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.warn(error);
  } finally {
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
  }
};

// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ date: true, id: true });

export const updateInvoice = async (id: string, formData: FormData) => {
  const validateForm = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validateForm.success) {
    return {
      errors: validateForm.error.flatten().fieldErrors,
      message: "MIssing fields. Failed to create invoice",
    };
  }

  const { amount, customerId, status } = validateForm.data;

  try {
    const amountInCents = Number(amount * 100);

    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;
  } catch (error) {
    console.warn(error);
  } finally {
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "invoice deleted" };
  } catch (error) {
    console.info("SERVER ERROR", (error as Error).message);

    throw new Error((error as Error).message);
    // return { message: `Error deleting invoice with id: ${id}` };
  } finally {
  }
};
