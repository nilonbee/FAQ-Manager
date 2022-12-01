import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useGlobalContext } from "./Context";

export default function SideMenu({ id }) {
  const { handleUpdate, handleDelete, anchorEl, handleMenuClose } =
    useGlobalContext();

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        boxShadow={0}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        className="menu"
      >
        <MenuItem boxShadow={0} onClick={() => handleUpdate(id)}>
          Update
        </MenuItem>
        <MenuItem boxShadow={0} onClick={() => handleDelete(id)}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
