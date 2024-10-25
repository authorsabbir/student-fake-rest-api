// Import necessary hooks from React and external libraries
import { useEffect, useState } from "react";
import "./Student.css";
import axios from "axios";

// Main Student component
const Student = () => {
  // State to handle form inputs for creating and updating student information
  const [input, setInput] = useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
    location: "",
  });

  // State to store the list of students retrieved from the server
  const [student, setStudent] = useState([]);

  // State to manage the form mode (update mode or creation mode)
  const [updateForm, SetUpdateForm] = useState(false);

  // Handle input change in the form fields
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission for creating a new student
  const handleStudentFromSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to add a new student
    const response = await axios.post("http://localhost:5050/students", input);
    // Reset form input values to empty strings after submission
    setInput({
      name: "",
      roll: "",
      email: "",
      phone: "",
      location: "",
    });
    // Fetch the updated list of students after a new student is added
    getAllStudents();
  };

  // Fetch all students from the server
  const getAllStudents = async () => {
    const response = await axios.get("http://localhost:5050/students");
    setStudent(response.data);
  };

  // Fetch all students once on component mount
  useEffect(() => {
    getAllStudents();
  }, []);

  // Handle deletion of a student
  const handleStudentDelete = async (id) => {
    // Send a DELETE request to remove the student by ID
    const response = await axios.delete(`http://localhost:5050/students/${id}`);
    // Fetch the updated list of students after deletion
    getAllStudents();
  };

  // Handle edit button click to fetch and load student data into form for editing
  const handleStudentEdit = async (id) => {
    SetUpdateForm(true); // Switch to update form mode
    const response = await axios.get(`http://localhost:5050/students/${id}`);
    setInput(response.data); // Load the selected student's data into the form inputs
  };

  // Handle form submission for updating an existing student
  const handleStudentUpdateFromSubmit = async (e) => {
    e.preventDefault();
    // Send a PUT request to update the student data by ID
    const response = await axios.put(
      `http://localhost:5050/students/${input.id}`,
      {
        name: input.name,
        roll: input.roll,
        email: input.email,
        phone: input.phone,
        location: input.location,
      }
    );
    // Fetch the updated list of students after updating a student
    getAllStudents();
    // Reset form input values and switch back to create form mode
    setInput({
      name: "",
      roll: "",
      email: "",
      phone: "",
      location: "",
    });
    SetUpdateForm(false);
  };

  return (
    <>
      <div className="student_area">
        {/* Conditional rendering: Show either create or update form based on `updateForm` state */}
        {!updateForm && (
          <div className="student_form">
            <h1 className="form_title">Student Registration</h1>
            <p className="form_subtitle">
              Please fill in the details below to register
            </p>
            {/* Form for creating a new student */}
            <form onSubmit={handleStudentFromSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll"
                value={input.roll}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={input.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={input.location}
                onChange={handleInputChange}
              />
              <button type="submit" className="create_button">
                Create
              </button>
            </form>
          </div>
        )}

        {updateForm && (
          <div className="student_form">
            <h1 className="form_title">Update Student Info</h1>
            <p className="form_subtitle">
              Please fill in the details below to info
            </p>
            {/* Form for updating existing student */}
            <form onSubmit={handleStudentUpdateFromSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll"
                value={input.roll}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={input.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={input.location}
                onChange={handleInputChange}
              />
              <button type="submit" className="update_button">
                Update
              </button>
              <button
                type="button"
                className="create_button"
                onClick={() => SetUpdateForm(false)}
              >
                Create New Student
              </button>
            </form>
          </div>
        )}

        {/* Display all students in a table */}
        <div className="student_data">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Display each student and actions for edit/delete */}
              {student.reverse().map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.roll}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.location}</td>
                    <td>
                      <button onClick={() => handleStudentEdit(item.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleStudentDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
