import { InvoiceItem, InvoiceStatus } from '@/types';

export function calcLineItemTotal(item: Pick<InvoiceItem, 'quantity' | 'unitPrice'>): number {
  return Number(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2));
}

export function calcInvoiceTotals(params: {
  items: InvoiceItem[];
  discount?: { type: 'percent' | 'fixed'; value: number };
  tax?: { label: string; rate: number };
  amountPaid?: number;
}): {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
  balance: number;
} {
  const { items, discount, tax, amountPaid = 0 } = params;

  const subtotal = items.reduce((sum, item) => sum + calcLineItemTotal(item), 0);

  let discountAmount = 0;
  if (discount && discount.value > 0) {
    if (discount.type === 'percent') {
      discountAmount = Number(((subtotal * discount.value) / 100).toFixed(2));
    } else {
      discountAmount = Number(discount.value.toFixed(2));
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  let taxAmount = 0;
  if (tax && tax.rate > 0) {
    taxAmount = Number(((taxableAmount * tax.rate) / 100).toFixed(2));
  }

  const total = Number((taxableAmount + taxAmount).toFixed(2));
  const balance = Number(Math.max(0, total - amountPaid).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount,
    taxableAmount,
    taxAmount,
    total,
    balance,
  };
}

export function computeInvoiceStatus(
  status: InvoiceStatus,
  dueDate: string,
  balance: number,
  amountPaid: number
): InvoiceStatus {
  if (status === 'draft' || status === 'void') {
    return status;
  }

  if (balance <= 0) {
    return 'paid';
  }

  const now = new Date();
  const due = new Date(dueDate);

  if (due < now && balance > 0) {
    return 'overdue';
  }

  if (amountPaid > 0 && balance > 0) {
    return 'partially_paid';
  }

  return status;
}

export function generateToken(prefix: 'inv' | 'pay' | 'rec' = 'inv'): string {
  const rand1 = Math.random().toString(36).substring(2, 10);
  const rand2 = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand1}${rand2}`;
}

export function getStatusBadgeConfig(status: InvoiceStatus): {
  label: string;
  className: string;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
} {
  switch (status) {
    case 'paid':
      return {
        label: 'Paid',
        variant: 'success',
        className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      };
    case 'partially_paid':
      return {
        label: 'Partially Paid',
        variant: 'info',
        className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      };
    case 'sent':
      return {
        label: 'Sent',
        variant: 'info',
        className: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      };
    case 'viewed':
      return {
        label: 'Viewed',
        variant: 'info',
        className: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      };
    case 'overdue':
      return {
        label: 'Overdue',
        variant: 'danger',
        className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      };
    case 'void':
      return {
        label: 'Void',
        variant: 'secondary',
        className: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',
      };
    case 'draft':
    default:
      return {
        label: 'Draft',
        variant: 'secondary',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      };
  }
}
