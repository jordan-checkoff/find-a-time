import { Button as MUIButton } from "@mui/material"

interface props {
    text: string,
    form?: boolean
}


export default function Button({text, form=false}: props) {

    return (
        <MUIButton variant="contained" type={form ? "submit" : "button"}>{text}</MUIButton>
    )
}