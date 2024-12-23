import React, { useState } from 'react';
import { Button, Popconfirm, ButtonProps } from 'antd';

interface PopConfirmProps {
    text: string;
    handleSubmit: () => Promise<any>;
    title: string;
    description: string
    type?: ButtonProps['type']

}
const PopConfirm: React.FC<PopConfirmProps> = ({ type = "primary", description, text, title, handleSubmit }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => setOpen(true);

    const handleOk = () => {
        setConfirmLoading(true);
        handleSubmit().then(() => handlePopverstate).catch(() => handlePopverstate);
    };
    const handlePopverstate = () => {
        setOpen(false);
        setConfirmLoading(false);
    };
    const handleCancel = () => setOpen(false);

    return (
        <Popconfirm
            title={title}
            description={description}
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
        >
            <Button
                className='w-full rounded-none'
                type={type}
                danger
                onClick={showPopconfirm}>
                {text}
            </Button>
        </Popconfirm>
    );
};

export default PopConfirm;