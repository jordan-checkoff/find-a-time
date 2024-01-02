import { forwardRef } from "react";
import DropdownInput from "./DropdownInput";
import { TIMEZONE_OPTIONS } from "../../utils/dropdown_options";


interface props {
    value: string,
    onChange: (...event: any[]) => any
}

export default forwardRef(function Timezone({value, onChange}: props, ref) {

    return (
        <DropdownInput
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={undefined}
            label={"Timezone"}
            options={TIMEZONE_OPTIONS}
        />
    )

})

