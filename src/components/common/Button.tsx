import { Button as MUIButton } from "@mui/material"

interface props {
    text: string,
    form?: boolean,
    onClick?: () => any,
    disabled?: boolean
}


export default function Button({text, form=false, onClick, disabled=false}: props) {

    return (
        <MUIButton onClick={onClick} disabled={disabled} variant="contained" type={form ? "submit" : "button"} fullWidth color="error">{text}</MUIButton>
    )
}