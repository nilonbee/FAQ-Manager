import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SideMenu from "./SideMenu";

import { useGlobalContext } from "./Context";

const SingleEmployee = React.memo(({ item }) => {
  const { question, category, privacy, isActive, id } = item;
  const { handleThreeDotsMenuClick } = useGlobalContext();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{question ? question : null}</td>
        <td>{category ? category : null}</td>
        <td>{privacy ? "Published" : "draft"}</td>
        <td>
          <IconButton
            color="primary"
            aria-label="Menu-Items"
            onClick={handleThreeDotsMenuClick}
            boxShadow={0}
          >
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </td>
        <SideMenu handleThreeDotsMenuClick={handleThreeDotsMenuClick} id={id} />
      </tr>
    </>
  );
});

export default SingleEmployee;
