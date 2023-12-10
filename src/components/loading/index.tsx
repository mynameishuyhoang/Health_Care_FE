import CircularProgress from "@mui/joy/CircularProgress";
import React from "react";

interface Props {
    style?: React.CSSProperties
}


const CustomLoading = (props: Props) => {
    const { style } = props;
    return (
        <div style={style}>
            <CircularProgress color="success" variant="plain" size="lg" />
        </div>
    )
}

export default CustomLoading