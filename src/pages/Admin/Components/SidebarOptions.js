import React from "react";

export const SidebarOptions = ({ selectedOption, setSelectedOption, handleModal }) => {
  const baseSidebarItems =
    "w-full h-[45px] md:h-[55px] text-left pl-6 flex items-center text-white rounded-md transition-all duration-200";

  const activeStyles = "bg-purple-700 text-white shadow-md";
  const hoverStyles = "hover:bg-purple-600 hover:text-white";

  return (
    <nav className="md:space-y-2 md:mt-4 px-4">
      <button
        onClick={() => setSelectedOption("Home")}
        className={`${baseSidebarItems} ${selectedOption === "Home" ? activeStyles : hoverStyles}`}
      >
        🏠 Home
      </button>

      <button
        onClick={() => setSelectedOption("Teacher")}
        className={`${baseSidebarItems} ${selectedOption === "Teacher" ? activeStyles : hoverStyles}`}
      >
        👩‍🏫 Add/Edit Teachers
      </button>

      <button
        onClick={() => setSelectedOption("Student")}
        className={`${baseSidebarItems} ${selectedOption === "Student" ? activeStyles : hoverStyles}`}
      >
        👨‍🎓 Add/Edit Students
      </button>

      <button
        onClick={() => setSelectedOption("Courses")}
        className={`${baseSidebarItems} ${selectedOption === "Courses" ? activeStyles : hoverStyles}`}
      >
        📚 View Courses
      </button>

      <button
        onClick={() => {
          handleModal();
          setSelectedOption("assign");
        }}
        className={`${baseSidebarItems} ${selectedOption === "assign" ? activeStyles : hoverStyles}`}
      >
        🔄 Assign Student - Teacher
      </button>
    </nav>
  );
};
