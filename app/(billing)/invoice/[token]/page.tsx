import React from 'react';
import { notFound } from 'next/navigation';
import { getInvoiceByToken } from '@/lib/api/invoices';
import { getClientById } from '@/lib/api/clients';
import { getSettings } from '@/lib/api/settings';
import { InvoiceDocument } from '@/components/billing/InvoiceDocument';

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;
  const invoice = await getInvoiceByToken(token);
  if (!invoice) return { title: 'Invoice Not Found' };

  return {
    title: `Invoice ${invoice.number} | Pitech Billing`,
    description: `View and settle invoice ${invoice.number} issued by Pitech Digital.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ClientInvoicePage({ params }: PageProps) {
  const { token } = await params;
  const invoice = await getInvoiceByToken(token);

  if (!invoice) {
    notFound();
  }

  const [client, settings] = await Promise.all([
    invoice.clientId ? getClientById(invoice.clientId) : null,
    getSettings(),
  ]);

  return <InvoiceDocument invoice={invoice} client={client} settings={settings} isClientView={true} />;
}
