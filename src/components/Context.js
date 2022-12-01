import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const Context = ({ children }) => {
  const url = "http://localhost:4000/questions";
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(4);
  const [open, setOpen] = React.useState(false);

/* Form Regarding Functions */

  const initialValues = {
    question: "",
    category: "",
    privacy: "",
    status: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /* Question Modal */

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setFormData({});
  };


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleThreeDotsMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

  /* Search */

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("value", value);
    setLoading(true);
    return await axios
      .get(`http://localhost:4000/questions?q=${value}`)
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  /* API Calls */

  const fetchQuestions = async (start, end, increase) => {
    const fetchUrl = `http://localhost:4000/questions?_start=${start}=0&_end=${end}=4`;
    setLoading(true);
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setQuestions(data);
      setCurrentPage(currentPage + increase);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    if (formData.id) {
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        fetch(url + `/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(handleModalClose)
          .then(fetchQuestions(0, 10, 0));
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(handleModalClose)
        .then(fetchQuestions(0, 10, 0));
    }
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure you want to Delete this row?");
    if (confirm) {
      fetch(`http://localhost:4000/questions/${index}`, { method: "DELETE" })
        .then((response) => response.json())
        .then(fetchQuestions(0, 10, 0));
    }
    fetchQuestions(0, 10, 0);
    handleMenuClose();
  };

  const handleUpdate = (id) => {
    const tempQuestion = questions.filter((item) => id === item.id);
    console.log("tempQuestion", tempQuestion);
    setFormData(tempQuestion[0]);
    handleClickOpen();
    handleMenuClose();
  };

  useEffect(() => {
    fetchQuestions(0, 100, 0);
  }, [formData, value]);

  return (
    <div>
      <AppContext.Provider
        value={{
          fetchQuestions,
          handleSearch,
          handleSubmit,
          setQuestions,
          setValue,
          value,
          loading,
          questions,
          currentPage,
          pageLimit,
          open,
          setOpen,
          handleClickOpen,
          handleModalClose,
          handleMenuClose,
          handleThreeDotsMenuClick,
          formData,
          setFormData,
          handleChange,
          handleSubmit,
          handleDelete,
          handleUpdate,
          anchorEl, 
          setAnchorEl
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default Context;
