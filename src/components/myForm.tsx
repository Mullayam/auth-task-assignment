import { MyFormFields } from "@/types";
import { useForm, FormProvider } from "react-hook-form";



interface FormProps {
    fields: MyFormFields[];
    onSubmit: (data: any) => void;
    defaultValues?: { [key: string]: any };
    children: React.ReactNode;
}

export const MyForm = ({ fields, onSubmit, defaultValues = {},children }: FormProps) => {
    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                {fields.map(({ name, label, type, validation }) => (
                    <div key={name}>
                        <label
                            htmlFor={name}
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            {label}
                        </label>
                        <input
                            id={name}
                            type={type}
                            {...methods.register(name, validation)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {methods.formState.errors[name] && (
                            <p className="mt-1 text-sm text-red-600">
                                {methods.formState.errors[name]?.message as string}
                            </p>
                        )}
                    </div>
                ))}
                {children}
 
            </form>
        </FormProvider>
    );
};

