import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function SimpleSnackbar({ open }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        message="Preferences Saved"
      />
    </div>
  );
}
