import { useEffect, useMemo, useState } from "react";
import {
  archive,
  employees,
  notifications,
  transactions,
  type Status,
} from "@/lib/mock-data";

export type Transaction = (typeof transactions)[number];
export type ArchiveDocument = (typeof archive)[number];
export type Employee = (typeof employees)[number];
export type NotificationItem = (typeof notifications)[number] & { read?: boolean };

type AppData = {
  transactions: Transaction[];
  archive: ArchiveDocument[];
  employees: Employee[];
  notifications: NotificationItem[];
  settings: Record<string, string>;
};

const STORAGE_KEY = "nineveh-digital-hub-data";

const defaults: AppData = {
  transactions,
  archive,
  employees,
  notifications: notifications.map((item) => ({ ...item, read: false })),
  settings: {
    institution: "محافظة نينوى",
    notifications: "التنبيهات الفورية مفعلة",
    security: "صلاحيات أساسية",
    locale: "العربية - بغداد (UTC+3)",
    appearance: "الوضع الفاتح",
  },
};

function loadData(): AppData {
  if (typeof window === "undefined") return defaults;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaults;
  try {
    return { ...defaults, ...JSON.parse(saved) };
  } catch {
    return defaults;
  }
}

export function useEditableData() {
  const [data, setData] = useState<AppData>(() => loadData());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return useMemo(
    () => ({
      data,
      resetData: () => setData(defaults),
      upsertTransaction: (item: Transaction) =>
        setData((current) => ({
          ...current,
          transactions: current.transactions.some((t) => t.id === item.id)
            ? current.transactions.map((t) => (t.id === item.id ? item : t))
            : [item, ...current.transactions],
        })),
      deleteTransaction: (id: string) =>
        setData((current) => ({
          ...current,
          transactions: current.transactions.filter((item) => item.id !== id),
        })),
      upsertArchive: (item: ArchiveDocument) =>
        setData((current) => ({
          ...current,
          archive: current.archive.some((doc) => doc.id === item.id)
            ? current.archive.map((doc) => (doc.id === item.id ? item : doc))
            : [item, ...current.archive],
        })),
      deleteArchive: (id: string) =>
        setData((current) => ({
          ...current,
          archive: current.archive.filter((item) => item.id !== id),
        })),
      upsertEmployee: (item: Employee) =>
        setData((current) => ({
          ...current,
          employees: current.employees.some((employee) => employee.name === item.name)
            ? current.employees.map((employee) => (employee.name === item.name ? item : employee))
            : [item, ...current.employees],
        })),
      deleteEmployee: (name: string) =>
        setData((current) => ({
          ...current,
          employees: current.employees.filter((item) => item.name !== name),
        })),
      markNotificationsRead: () =>
        setData((current) => ({
          ...current,
          notifications: current.notifications.map((item) => ({ ...item, read: true })),
        })),
      updateNotification: (id: number, patch: Partial<NotificationItem>) =>
        setData((current) => ({
          ...current,
          notifications: current.notifications.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      updateSetting: (key: string, value: string) =>
        setData((current) => ({
          ...current,
          settings: { ...current.settings, [key]: value },
        })),
    }),
    [data],
  );
}

export const statuses: Status[] = ["قيد الإنجاز", "منجزة", "متأخرة", "بانتظار الموافقة"];

export function today() {
  return new Date().toISOString().slice(0, 10);
}
