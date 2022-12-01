import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useGlobalContext } from "./Context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dialog: {
    borderRadius: 6,
    maxWidth: 20,
  }
}));

export default React.memo(function QuestionModal() {
  //select
  const classes = useStyles();
  const {
    open,
    setOpen,
    handleClickOpen,
    handleModalClose,
    formData,
    setFormData,
    handleChange,
    handleSubmit,

  } = useGlobalContext();

  const {id} = formData;

  const handleChangee = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleModalClose}
        dialog={classes.dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id ? "Update Question" : "Create New Question"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="question"
              placeholder="Type Question"
              label="Question"
              margin="dense"
              value={formData.question}
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              id="category"
              placeholder="Type Catogery"
              label="Catogery"
              margin="dense"
              value={formData.category}
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="Form-select-helper-label-privacy-label">
                Status
              </InputLabel>
              <Select
                labelId="Form-select-helper-label-privacy"
                id="privacy"
                name="privacy"
                value={formData.privacy}
                onChange={(e) => handleChangee(e)}
              >
                <MenuItem value={"published"}>Published</MenuItem>
                <MenuItem value={"draft"}>Draft</MenuItem>
              </Select>
              <FormHelperText>
                Weather published or keep as a draft FAQ
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="Form-select-helper-label-Status-label">
                Status
              </InputLabel>
              <Select
                labelId="Form-select-helper-label-Status"
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) => handleChangee(e)}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
              <FormHelperText>
                Weather Active or keep as a Inactive FAQ
              </FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary" variant="outlined">
            Disagree
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="standard">
          {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
