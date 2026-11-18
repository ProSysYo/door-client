"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { CustomersTable } from "../components/customers-table";
import { CustomerForm } from "../components/customer-form";
import { useGetCustomers } from "@/entities/customers/customers.queries";
import { Customer } from "@/entities/customers/customers.types";

type DialogMode = { mode: "create" } | { mode: "edit"; customer: Customer };

export const CustomersList = () => {
    const { data, isLoading } = useGetCustomers();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editCustomer = dialog.mode === "edit" ? dialog.customer : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (customer: Customer) => {
        setDialog({ mode: "edit", customer });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Заказчики</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить заказчика
                    <Plus size={20} />
                </Button>
            </div>

            <CustomersTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editCustomer ? "Редактировать заказчика" : "Добавить заказчика"}
                description={editCustomer ? "Измените данные заказчика" : "Заполните данные для создания нового заказчика"}
            >
                <CustomerForm
                    editId={editCustomer?.id}
                    initialValues={editCustomer ? { name: editCustomer.name, code: editCustomer.code } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
