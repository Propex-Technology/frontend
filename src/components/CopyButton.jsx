import React, { useState } from "react";
import { IconButton } from "@mui/material";
import CopyIcon from '@mui/icons-material/CopyAll';
import CheckIcon from '@mui/icons-material/Check'

export default function ({ copyText, size }) {
    if (size == null) size = 'small';

    const [copied, setCopied] = useState(false);

    function copyEvent() {
        navigator.clipboard.writeText(copyText)
        .then(() => {
            setCopied(true);
            setTimeout(function() {
                setCopied(false);
            },
            4000);
        })
    }

    const icon = copied ? <CheckIcon fontsize="inherit" /> : <CopyIcon fontSize="inherit" />;

    return (
        <IconButton size={size} onClick={copyEvent}>
            {icon}
        </IconButton>
    );
}